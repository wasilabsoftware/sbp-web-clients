"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const ACTION_CODE_MESSAGES: Record<string, string> = {
  "000": "Aprobada",
  "116": "Fondos insuficientes",
  "129": "CVV inválido",
  "191": "Contacte a su emisor de tarjeta",
  "670": "Fraude detectado",
};

const ERROR_MESSAGES: Record<string, string> = {
  missing_order_id: "No se encontró el identificador de la orden.",
  missing_token: "No se recibió la respuesta del formulario de pago.",
  order_not_found: "La orden no fue encontrada.",
  internal: "Ocurrió un error interno. Por favor intenta de nuevo.",
};

export function CheckoutResult() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");
  const actionCode = searchParams.get("actionCode");
  const errorCode = searchParams.get("error");

  const isSuccess = status === "success";

  const getErrorMessage = () => {
    if (errorCode && ERROR_MESSAGES[errorCode]) {
      return ERROR_MESSAGES[errorCode];
    }
    if (actionCode && ACTION_CODE_MESSAGES[actionCode]) {
      return ACTION_CODE_MESSAGES[actionCode];
    }
    if (actionCode) {
      return `Pago rechazado (código: ${actionCode})`;
    }
    return "El pago no pudo ser procesado.";
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between bg-bg-surface h-16 px-5">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">
          {isSuccess ? "Pago completado" : "Resultado del pago"}
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[520px] mx-auto px-5 lg:px-0 py-8 lg:py-16">
          {isSuccess ? (
            /* ── Success ── */
            <div className="bg-bg-surface rounded-xl p-6 lg:p-8 shadow-[0_4px_20px_var(--shadow-color)]">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-berry-green mx-auto mb-4" />
                <h2 className="text-xl font-bold text-berry-green mb-2">
                  Pago exitoso
                </h2>
                <p className="text-text-secondary">
                  Tu pedido está confirmado.
                </p>
              </div>

              {orderId && (
                <div className="bg-bg-muted rounded-lg p-4 text-sm space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Orden</span>
                    <span className="font-mono text-text-primary">
                      {orderId}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push("/")}
                  className="w-full h-14 text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Volver a la tienda
                </Button>
              </div>
            </div>
          ) : (
            /* ── Error / Failed ── */
            <div className="bg-bg-surface rounded-xl p-6 lg:p-8 text-center shadow-[0_4px_20px_var(--shadow-color)]">
              <XCircle className="w-16 h-16 text-berry-red mx-auto mb-4" />
              <h2 className="text-xl font-bold text-berry-red mb-2">
                Error en el pago
              </h2>
              <p className="text-text-secondary mb-6">{getErrorMessage()}</p>

              <div className="flex flex-col gap-3">
                {orderId && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push(`/checkout?orderId=${orderId}`)}
                    className="w-full h-14 text-base"
                  >
                    Intentar de nuevo
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/")}
                  className="w-full h-14 text-base"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Volver a la tienda
                </Button>
              </div>
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
