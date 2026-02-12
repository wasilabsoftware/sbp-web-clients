"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreditCard, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  createPaymentSession,
  loadCheckoutScript,
} from "@/lib/services/payment.service";
import type { PaymentSession } from "@/types/payment";

const TEST_ORDER_ID = "7f1d3492-146b-418b-8f0e-f1652807b350";

type CheckoutState = "loading" | "ready" | "paying" | "error";

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId") || TEST_ORDER_ID;

  const [state, setState] = useState<CheckoutState>("loading");
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const niubizLoaded = useRef(false);

  // Step 1: Create payment session
  const initSession = useCallback(async () => {
    setState("loading");
    setError(null);

    try {
      const data = await createPaymentSession(orderId, "web");
      setSession(data);
      setState("ready");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  }, [orderId]);

  // Step 2: Load checkout.js and open Niubiz form
  // After the user completes the form, Niubiz POSTs to session.action (backend)
  // The backend authorizes and redirects to /checkout/result
  const openPaymentForm = useCallback(async () => {
    if (!session) return;

    setState("paying");

    try {
      await loadCheckoutScript(session.checkoutJsUrl);
      niubizLoaded.current = true;

      const VisanetCheckout = (window as any).VisanetCheckout;

      if (!VisanetCheckout) {
        throw new Error("No se pudo cargar el formulario de pago");
      }

      VisanetCheckout.configure({
        sessiontoken: session.sessionToken,
        channel: "web",
        merchantid: session.merchantId,
        purchasenumber: session.purchaseNumber,
        amount: session.amount,
        expirationminutes: "20",
        timeouturl: `${window.location.origin}/checkout/timeout`,
        merchantlogo: `${window.location.origin}/vercel.svg`,
        formbuttoncolor: "#E63946",
        action: session.action,
      });

      VisanetCheckout.open();
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  }, [session]);

  const handleRetry = () => {
    niubizLoaded.current = false;
    initSession();
  };

  // Initialize on mount
  useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between bg-bg-surface h-16 px-5">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">Pago</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[520px] mx-auto px-5 lg:px-0 py-8 lg:py-16">
          {/* Order info */}
          {session && (
            <p className="text-text-tertiary text-sm text-center mb-6">
              Orden: {session.orderNumber}
            </p>
          )}

          {/* Loading */}
          {state === "loading" && (
            <div className="bg-bg-surface rounded-xl p-8 text-center shadow-[0_4px_20px_var(--shadow-color)]">
              <Loader2 className="w-8 h-8 text-berry-red animate-spin mx-auto" />
              <p className="mt-4 text-text-secondary">
                Preparando tu pago...
              </p>
            </div>
          )}

          {/* Ready — Show order summary + pay button */}
          {state === "ready" && session && (
            <div className="flex flex-col gap-4">
              {/* Amount card */}
              <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_20px_var(--shadow-color)]">
                <div className="bg-berry-red-light rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-text-secondary font-medium">
                      Total a pagar
                    </span>
                    <span className="text-[28px] font-bold text-berry-red">
                      S/ {session.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pay button card */}
              <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_20px_var(--shadow-color)]">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={openPaymentForm}
                  className="w-full h-14 text-base"
                >
                  <CreditCard className="w-5 h-5" />
                  Pagar con tarjeta
                </Button>

                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <ShieldCheck className="w-4 h-4 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">
                    Pago seguro procesado por Niubiz
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Paying — Niubiz form is open */}
          {state === "paying" && (
            <div className="bg-bg-surface rounded-xl p-8 text-center shadow-[0_4px_20px_var(--shadow-color)]">
              <CreditCard className="w-10 h-10 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">
                Completa tu pago en la ventana de Niubiz...
              </p>
            </div>
          )}

          {/* Error — Session creation failed */}
          {state === "error" && (
            <div className="bg-bg-surface rounded-xl p-6 lg:p-8 text-center shadow-[0_4px_20px_var(--shadow-color)]">
              <Loader2 className="w-16 h-16 text-berry-red mx-auto mb-4" />
              <h2 className="text-xl font-bold text-berry-red mb-2">
                Error en el pago
              </h2>
              <p className="text-text-secondary mb-6">{error}</p>

              <Button
                variant="outline"
                size="lg"
                onClick={handleRetry}
                className="w-full h-14 text-base"
              >
                Intentar de nuevo
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}
