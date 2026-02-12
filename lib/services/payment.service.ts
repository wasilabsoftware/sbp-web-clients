import type { PaymentConfig, PaymentSession } from "@/types/payment";

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
