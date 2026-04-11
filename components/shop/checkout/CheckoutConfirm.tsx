"use client";

import { useState, useCallback } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createOrder } from "@/lib/services/order.service";
import {
  createPaymentSession,
  loadCheckoutScript,
} from "@/lib/services/payment.service";
import type { DeliveryFormData } from "@/lib/validations/checkout";
import type { ServerCartItem } from "@/types/cart";
import type { PaymentSession } from "@/types/payment";

interface CheckoutConfirmProps {
  items: ServerCartItem[];
  subtotal: string;
  deliveryFee: string;
  total: string;
  customerId: string;
  deliveryData: DeliveryFormData;
  onBack: () => void;
  onCartClear: () => void;
}

type ConfirmState = "idle" | "creating_order" | "creating_session" | "paying" | "error";

export function CheckoutConfirm({
  items,
  subtotal,
  deliveryFee,
  total,
  customerId,
  deliveryData,
  onBack,
  onCartClear,
}: CheckoutConfirmProps) {
  const [state, setState] = useState<ConfirmState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = useCallback(async () => {
    setState("creating_order");
    setError(null);

    try {
      // 1. Create order
      const orderPayload = {
        customerId,
        subtotalAmount: subtotal,
        deliveryFee,
        totalAmount: total,
        deliveryAddress: deliveryData.address,
        deliveryDistrictId: deliveryData.districtId,
        deliveryDate: new Date(
          `${deliveryData.deliveryDate}T${deliveryData.deliveryTimeSlot.split(" - ")[0]}:00`
        ).toISOString(),
        orderSource: "web" as const,
        items: items.map((item) => ({
          productId: item.product.id,
          variantId: item.variant.id,
          productName: item.product.name,
          variantName: item.variant.name,
          productSku: item.variant.sku,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: (
            parseFloat(item.quantity) * parseFloat(item.unitPrice)
          ).toFixed(2),
          specialInstructions: item.specialInstructions || undefined,
        })),
      };

      const order = await createOrder(orderPayload);

      // 2. Clear cart BEFORE Niubiz (redirect will navigate away)
      onCartClear();

      // 3. Create payment session
      setState("creating_session");
      const session = await createPaymentSession(order.id, "web");

      // 4. Load checkout.js and open Niubiz form
      setState("paying");
      await loadCheckoutScript(session.checkoutJsUrl);

      const VisanetCheckout = (window as Record<string, unknown>).VisanetCheckout as {
        configure: (config: Record<string, unknown>) => void;
        open: () => void;
      };

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
        merchantlogo: `${window.location.origin}/logo.png`,
        formbuttoncolor: "#E63946",
        action: session.action,
      });

      VisanetCheckout.open();
    } catch (err) {
      setError((err as Error).message || "Error al procesar el pedido");
      setState("error");
    }
  }, [
    customerId,
    subtotal,
    deliveryFee,
    total,
    deliveryData,
    items,
    onCartClear,
  ]);

  const isProcessing =
    state === "creating_order" ||
    state === "creating_session" ||
    state === "paying";

  const stateMessage = {
    creating_order: "Creando tu pedido...",
    creating_session: "Preparando el pago...",
    paying: "Completa tu pago en la ventana de Niubiz...",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Order Summary */}
      <div className="bg-bg-surface rounded-xl p-5 lg:p-6">
        <h3 className="text-base lg:text-lg font-bold text-text-primary mb-4">
          Confirmar Pedido
        </h3>

        {/* Delivery Info */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-text-tertiary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                {deliveryData.address}
              </p>
              {deliveryData.addressReference && (
                <p className="text-xs text-text-tertiary">
                  Ref: {deliveryData.addressReference}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-text-tertiary shrink-0" />
            <p className="text-sm text-text-primary">
              {new Date(deliveryData.deliveryDate + "T12:00:00").toLocaleDateString(
                "es-PE",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-text-tertiary shrink-0" />
            <p className="text-sm text-text-primary">
              {deliveryData.deliveryTimeSlot}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-text-tertiary shrink-0" />
            <p className="text-sm text-text-primary">{deliveryData.phone}</p>
          </div>

          {deliveryData.notes && (
            <p className="text-xs text-text-tertiary ml-7">
              Notas: {deliveryData.notes}
            </p>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-border-subtle pt-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-text-primary">Total</span>
            <span className="text-xl font-bold text-berry-red">
              S/ {parseFloat(total).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-bg-surface rounded-xl p-6 text-center">
          <Loader2 className="w-8 h-8 text-berry-red animate-spin mx-auto mb-3" />
          <p className="text-sm text-text-secondary">
            {stateMessage[state as keyof typeof stateMessage]}
          </p>
        </div>
      )}

      {/* Error */}
      {state === "error" && error && (
        <div className="bg-berry-red-light border border-berry-red/20 rounded-xl px-4 py-3">
          <p className="text-sm text-berry-red">{error}</p>
        </div>
      )}

      {/* Actions */}
      {!isProcessing && (
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            className="w-full h-14 text-base"
          >
            <CreditCard className="w-5 h-5" />
            Confirmar Pedido — S/ {parseFloat(total).toFixed(2)}
          </Button>

          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-text-tertiary" />
            <span className="text-xs text-text-tertiary">
              Pago seguro procesado por Niubiz
            </span>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="w-full h-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Datos de Envío
          </Button>
        </div>
      )}
    </div>
  );
}
