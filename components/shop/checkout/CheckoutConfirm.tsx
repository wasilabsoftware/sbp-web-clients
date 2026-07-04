"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createOrder } from "@/lib/services/order.service";
import {
  createPaymentSession,
  loadCheckoutScript,
  createIzipaySession,
  openIzipayCheckout,
  validateIzipayCallback,
} from "@/lib/services/payment.service";
import type { DeliveryFormData } from "@/lib/validations/checkout";
import type { ServerCartItem } from "@/types/cart";
import type { CreateOrderResponse } from "@/types/order";

/** WhatsApp business line used for Yape/Plin payment coordination. */
const WHATSAPP_NUMBER = "51952805608";

/**
 * Toggle to switch the active payment gateway during sandbox testing.
 * Once Izipay is verified end-to-end we can remove the Niubiz branch.
 */
const PAYMENT_GATEWAY: "niubiz" | "izipay" = "izipay";

/** Container selector where the Krypton form mounts (popin mode renders a modal). */
const IZIPAY_CONTAINER_ID = "kr-container";

interface CheckoutConfirmProps {
  items: ServerCartItem[];
  subtotal: string;
  deliveryFee: string;
  total: string;
  customerId: string;
  deliveryData: DeliveryFormData;
  onBack: () => void;
  onCartClear: () => void;
  onOrderCreated?: () => void;
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
  onOrderCreated,
}: CheckoutConfirmProps) {
  const [state, setState] = useState<ConfirmState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<CreateOrderResponse | null>(null);
  const router = useRouter();

  const buildOrderPayload = useCallback(
    () => ({
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
      items: items.map((item) => {
        const totalPrice = (
          parseFloat(item.quantity) * parseFloat(item.unitPrice)
        ).toFixed(2);

        // Pack line — the server prices it from the bundle-cost view.
        if (item.bundle) {
          return {
            bundleId: item.bundle.id,
            productName: item.bundle.name,
            productSku: item.bundle.slug,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice,
            specialInstructions: item.specialInstructions || undefined,
          };
        }

        return {
          productId: item.product?.id,
          variantId: item.variant?.id,
          productName: item.product?.name ?? "",
          variantName: item.variant?.name,
          productSku: item.variant?.sku ?? "",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice,
          specialInstructions: item.specialInstructions || undefined,
        };
      }),
    }),
    [customerId, subtotal, deliveryFee, total, deliveryData, items]
  );

  // Step 1: create the order. Does NOT open any payment modal — once the order
  // exists we lock the flow (onOrderCreated) and surface the payment options.
  const handleCreateOrder = useCallback(async () => {
    setState("creating_order");
    setError(null);
    try {
      const order = await createOrder(buildOrderPayload());
      setCreatedOrder(order);
      onOrderCreated?.();
      setState("idle");
    } catch (err) {
      setError((err as Error).message || "Error al crear el pedido");
      setState("error");
    }
  }, [buildOrderPayload, onOrderCreated]);

  // Step 2a: pay the already-created order with a card via the gateway.
  const handlePayCard = useCallback(async () => {
    if (!createdOrder) return;
    setError(null);

    try {
      // Cart-clearing differs per gateway:
      //   - Niubiz redirects the page (modal navigates away), so we clear
      //     beforehand because we won't return here.
      //   - Izipay popin keeps us on the same page; clearing now would
      //     trigger CheckoutClient's "empty cart → /carrito" redirect and
      //     unmount the container the popin needs to mount into.
      setState("creating_session");

      if (PAYMENT_GATEWAY === "izipay") {
        // ─── IZIPAY (Lyra Krypton) ──────────────────────────────────────
        // Mint formToken, mount the kr-payment-form SDK in popin mode, wait
        // for the user to submit, post the kr-answer + kr-hash to /validate.
        const session = await createIzipaySession(createdOrder.id);

        setState("paying");
        const data = await openIzipayCheckout(session, `#${IZIPAY_CONTAINER_ID}`);
        const result = await validateIzipayCallback({
          "kr-answer": data.rawClientAnswer,
          "kr-hash": data.hash,
        });

        // Clear cart only AFTER validation completes — keeps the kr-container
        // mounted for the duration of the popin flow. If the user dismisses
        // the popin, the cart is preserved and they can retry.
        if (result.success) {
          onCartClear();
        }

        const params = new URLSearchParams({
          orderId: createdOrder.id,
          gateway: "izipay",
          status: result.success ? "success" : "failed",
          orderStatus: result.orderStatus,
        });
        router.push(`/checkout/result?${params.toString()}`);
        return;
      }

      // ─── NIUBIZ ─────────────────────────────────────────────────────
      // Clear cart BEFORE Niubiz (redirect navigates away)
      onCartClear();
      const session = await createPaymentSession(createdOrder.id, "web");

      // Load checkout.js and open Niubiz form
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
        merchantlogo: "https://imagedelivery.net/hrfM92Tw965illARz9WHuA/45c88eec-3e75-49f6-9976-6cea56a51f00/Hero",
        formbuttoncolor: "#E63946",
        action: session.action,
      });

      VisanetCheckout.open();
    } catch (err) {
      setError((err as Error).message || "Error al procesar el pago");
      setState("error");
    }
  }, [createdOrder, onCartClear, router]);

  // Step 2b: coordinate Yape/Plin payment over WhatsApp. The order stays
  // `pending`; the user lands on the order detail where they can pay later.
  const handleYapePlin = useCallback(() => {
    if (!createdOrder) return;
    const message =
      `¡Hola! Acabo de crear el pedido ${createdOrder.orderNumber} por ` +
      `S/ ${parseFloat(total).toFixed(2)}. Quiero gestionar el pago con Yape o Plin. ¿Me ayudan?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onCartClear();
    router.push(`/pedido/${createdOrder.id}`);
  }, [createdOrder, total, onCartClear, router]);

  const isCardProcessing = state === "creating_session" || state === "paying";

  return (
    <div className="flex flex-col gap-5">
      {/* Next-day Delivery Reminder */}
      <div className="flex items-start gap-3 bg-berry-green/10 border border-berry-green/20 rounded-xl p-4">
        <Clock className="w-5 h-5 text-berry-green shrink-0 mt-0.5" />
        <p className="text-sm text-text-primary">
          <span className="font-semibold">Entrega al día siguiente.</span>{" "}
          <span className="text-text-secondary">
            Te contactaremos pronto para confirmar la entrega.
          </span>
        </p>
      </div>

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

      {/* Error */}
      {state === "error" && error && (
        <div className="bg-berry-red-light border border-berry-red/20 rounded-xl px-4 py-3">
          <p className="text-sm text-berry-red">{error}</p>
        </div>
      )}

      {/* Actions — Phase A: order not created yet */}
      {!createdOrder && (
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateOrder}
            loading={state === "creating_order"}
            disabled={state === "creating_order"}
            className="w-full h-14 text-base"
          >
            <CreditCard className="w-5 h-5" />
            Confirmar Pedido — S/ {parseFloat(total).toFixed(2)}
          </Button>

          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-text-tertiary" />
            <span className="text-xs text-text-tertiary">
              Pago seguro procesado por{" "}
              {PAYMENT_GATEWAY === "izipay" ? "Izipay" : "Niubiz"}
            </span>
          </div>

          <div className="border-t border-border-subtle pt-4 mt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              disabled={state === "creating_order"}
              className="w-full h-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Datos de Envío
            </Button>
          </div>
        </div>
      )}

      {/* Actions — Phase B: order created, choose payment method.
          Stays visible during card processing so the user can always fall
          back to Yape/Plin (e.g. if they close the Izipay window). */}
      {createdOrder && (
        <div className="bg-bg-surface rounded-xl p-5 lg:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-base lg:text-lg font-bold text-text-primary">
              Elige cómo pagar
            </h3>
            <p className="text-xs text-text-tertiary mt-1">
              Pedido {createdOrder.orderNumber} creado. Completa tu pago para
              confirmarlo.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handlePayCard}
              loading={isCardProcessing}
              disabled={isCardProcessing}
              className="w-full h-14 text-base"
            >
              {!isCardProcessing && <CreditCard className="w-5 h-5" />}
              {isCardProcessing ? "Procesando pago..." : "Pagar con tarjeta"}
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              onClick={handleYapePlin}
              className="w-full h-14 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              ¿Pagas con Yape o Plin?
            </Button>
          </div>

          {isCardProcessing && (
            <p className="text-xs text-text-tertiary text-center">
              Si cerraste la ventana de Izipay, también puedes pagar con Yape o
              Plin.
            </p>
          )}

          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-text-tertiary" />
            <span className="text-xs text-text-tertiary">
              Pago seguro procesado por{" "}
              {PAYMENT_GATEWAY === "izipay" ? "Izipay" : "Niubiz"}
            </span>
          </div>
        </div>
      )}

      {/* Mount point for the Izipay (Krypton) form. In popin mode the SDK
          renders an overlay; the container itself stays empty in the layout. */}
      {PAYMENT_GATEWAY === "izipay" && (
        <div id={IZIPAY_CONTAINER_ID}>
          <div className="kr-embedded" kr-popin="true" />
        </div>
      )}
    </div>
  );
}
