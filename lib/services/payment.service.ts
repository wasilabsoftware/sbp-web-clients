import type {
  PaymentConfig,
  PaymentSession,
  IzipaySession,
  IzipayCallbackBody,
  IzipayValidateResponse,
  KrPaymentData,
} from "@/types/payment";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

export async function getPaymentConfig(): Promise<PaymentConfig> {
  const res = await fetch(`${getApiUrl()}/api/v1/payments/config`);

  if (!res.ok) {
    throw new Error("Error al obtener la configuración de pago");
  }

  return res.json();
}

export async function createPaymentSession(
  orderId: string,
  channel: "web" | "mobile" = "web"
): Promise<PaymentSession> {
  const res = await fetch(`${getApiUrl()}/api/v1/payments/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, channel }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error al crear la sesión de pago");
  }

  return res.json();
}

export function loadCheckoutScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Error al cargar el formulario de pago"));
    document.head.appendChild(script);
  });
}

// ─── Izipay (Lyra Krypton / Mi Cuenta Web) ──────────────────────────────────
// Backend mints a `formToken`. The browser loads kr-payment-form.min.js from
// staticBase, configures KR with the formToken + publicKey, then attaches the
// form to a container. KR.onSubmit fires with rawClientAnswer + hash, which we
// POST back to /api/v1/izipay/validate. See api/docs/izipay/MAIN.md.

export async function createIzipaySession(orderId: string): Promise<IzipaySession> {
  const res = await fetch(`${getApiUrl()}/api/v1/izipay/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error al crear la sesión de pago");
  }

  return res.json();
}

export async function validateIzipayCallback(
  body: IzipayCallbackBody,
): Promise<IzipayValidateResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/izipay/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error al validar el pago");
  }

  return res.json();
}

function loadStylesheetOnce(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Brand-color overrides for the Krypton form. Applied via an injected
 * <style> tag (idempotent) so we don't fight Tailwind/CSS-Modules ordering.
 * Brand red `#E63946` matches our --berry-red CSS variable.
 */
const IZIPAY_BRAND_STYLE_ID = "izipay-brand-overrides";
function injectIzipayBrandStyles(): void {
  if (document.getElementById(IZIPAY_BRAND_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = IZIPAY_BRAND_STYLE_ID;
  style.textContent = `
    /* The "Pagar" button — both the inline trigger and the in-popin submit.
       Full width + brand red so it matches our own CTAs. Higher-specificity
       selector (.kr-embedded …) ensures we win over the classic.js theme. */
    .kr-embedded .kr-payment-button,
    .kr-payment-button,
    .kr-popin-button-confirm {
      background-color: #E63946 !important;
      color: #FFFFFF !important;
      border: none !important;
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      transition: background-color 0.15s ease;
    }
    .kr-embedded .kr-payment-button:hover,
    .kr-payment-button:hover,
    .kr-popin-button-confirm:hover {
      background-color: #C41E3A !important;
    }

    /* Field focus accent */
    .kr-input-wrapper:focus-within {
      border-color: #E63946 !important;
    }

    /* Popin header / cart bubble — match brand */
    .kr-popin-shop-info-cart-icon-circle {
      background-color: #E63946 !important;
      border-color: #E63946 !important;
    }
  `;
  document.head.appendChild(style);
}

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Error loading ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Mounts the Krypton form into a container using the canonical
 * @lyracom/embedded-form-glue loader (same flow as Izipay's React samples).
 *
 * KRGlue.loadLibrary handles loading kr-payment-form.min.js and wiring
 * the kr-public-key. We still load classic-reset.css + classic.js
 * separately because KRGlue does NOT include the theme assets — those are
 * loaded statically in the Izipay sample's <head>.
 *
 * Resolves with the `paymentData` from KR.onSubmit. Returning `false` from
 * the callback suppresses the SDK's default redirect — we navigate ourselves.
 */
export async function openIzipayCheckout(
  session: IzipaySession,
  containerSelector: string,
): Promise<KrPaymentData> {
  const KRGlue = (await import("@lyracom/embedded-form-glue")).default;

  loadStylesheetOnce(`${session.staticBase}/static/js/krypton-client/V4.0/ext/classic-reset.css`);
  await loadScriptOnce(`${session.staticBase}/static/js/krypton-client/V4.0/ext/classic.js`);
  injectIzipayBrandStyles();

  // Sanity check before KRGlue — gives a clearer error than its regex.
  if (!/^[\w-]+:(test)?publickey_\w+$/.test(session.publicKey)) {
    throw new Error(
      `Backend devolvió publicKey con formato incorrecto. Esperado: "{shopId}:[test]publickey_xxx".`,
    );
  }

  const { KR } = await KRGlue.loadLibrary(session.staticBase, session.publicKey);

  // Ensure kr-popin="true" is on the .kr-embedded element BEFORE attachForm
  // reads it. React passes dashed attributes through, but setting it
  // imperatively here removes any doubt about timing or attribute stripping.
  const container = document.querySelector(containerSelector);
  const krEmbedded = container?.querySelector(".kr-embedded");
  krEmbedded?.setAttribute("kr-popin", "true");

  await KR.setFormConfig({
    formToken: session.formToken,
    "kr-language": session.language,
  });

  return new Promise<KrPaymentData>(async (resolve, reject) => {
    try {
      KR.onSubmit((data) => {
        KR.closePopin();
        resolve(data as unknown as KrPaymentData);
        return false; // suppress default redirect; we navigate ourselves
      });
      const { result } = await KR.attachForm(containerSelector);
      await KR.showForm(result.formId);

      // Auto-open the popin so the user goes directly from "Confirmar Pedido"
      // → modal, with no intermediate SDK trigger button. The CSS hides that
      // button as a safety net; this triggers the open programmatically.
      // Small delay lets the SDK finish rendering its DOM.
      setTimeout(() => {
        const krAny = KR as unknown as { openPopin?: () => void };
        if (typeof krAny.openPopin === "function") {
          krAny.openPopin();
        } else {
          const btn = document.querySelector(".kr-payment-button") as HTMLElement | null;
          btn?.click();
        }
      }, 150);
    } catch (err) {
      reject(err);
    }
  });
}
