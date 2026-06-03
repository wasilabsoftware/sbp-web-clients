"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Package,
  CheckCircle,
  Clock,
  Truck,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getOrderById } from "@/lib/services/order.service";
import {
  createIzipaySession,
  openIzipayCheckout,
  validateIzipayCallback,
} from "@/lib/services/payment.service";
import { Button } from "@/components/ui/Button";
import { ORDER_STATUS_CONFIG } from "@/types/order";
import type { ApiOrderDetail, OrderStatus, PaymentStatus } from "@/types/order";

/** WhatsApp business line used for Yape/Plin payment coordination. */
const WHATSAPP_NUMBER = "51952805608";

/** Container selector where the Krypton popin form mounts. */
const IZIPAY_CONTAINER_ID = "kr-container";

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: "Pendiente", color: "text-amber-600", bgColor: "bg-amber-100" },
  paid: { label: "Pagado", color: "text-berry-green", bgColor: "bg-berry-green-light" },
  failed: { label: "Fallido", color: "text-red-600", bgColor: "bg-red-100" },
};

const TRACKING_STEPS: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: "pending", label: "Pedido recibido", icon: Package },
  { status: "confirmed", label: "Confirmado", icon: CheckCircle },
  { status: "preparing", label: "En preparación", icon: Clock },
  { status: "in_transit", label: "En camino", icon: Truck },
  { status: "delivered", label: "Entregado", icon: CheckCircle },
];

const STATUS_ORDER: OrderStatus[] = [
  "pending", "confirmed", "preparing", "ready_delivery", "in_transit", "delivered",
];

function getStatusIndex(status: OrderStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { token, initialize } = useAuth();
  const [order, setOrder] = useState<ApiOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payState, setPayState] = useState<"idle" | "paying" | "error">("idle");
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => { initialize(); }, [initialize]);

  const loadOrder = useCallback(() => {
    if (!token) return;
    setIsLoading(true);
    getOrderById(token, id)
      .then(setOrder)
      .catch((err) => setError((err as Error).message))
      .finally(() => setIsLoading(false));
  }, [token, id]);

  useEffect(() => { loadOrder(); }, [loadOrder]);

  const handlePayCard = useCallback(async () => {
    if (!order) return;
    setPayError(null);
    setPayState("paying");
    try {
      const session = await createIzipaySession(order.id);
      const data = await openIzipayCheckout(session, `#${IZIPAY_CONTAINER_ID}`);
      await validateIzipayCallback({
        "kr-answer": data.rawClientAnswer,
        "kr-hash": data.hash,
      });
      // Refresh the order so the payment badge reflects the new status.
      setPayState("idle");
      loadOrder();
    } catch (err) {
      setPayError((err as Error).message || "Error al procesar el pago");
      setPayState("error");
    }
  }, [order, loadOrder]);

  const handleYapePlin = useCallback(() => {
    if (!order) return;
    const message =
      `¡Hola! Quiero gestionar el pago del pedido ${order.orderNumber} por ` +
      `S/ ${parseFloat(order.totalAmount).toFixed(2)} con Yape o Plin. ¿Me ayudan?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }, [order]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="bg-bg-surface rounded-xl p-8 text-center max-w-md mx-5">
          <p className="text-text-secondary mb-4">{error || "Pedido no encontrado"}</p>
          <button onClick={() => router.push("/mi-cuenta/pedidos")} className="text-berry-red font-semibold hover:underline">
            Volver a mis pedidos
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS_CONFIG[order.orderStatus] || ORDER_STATUS_CONFIG.pending;
  const currentStatusIdx = getStatusIndex(order.orderStatus);
  const isCancelled = order.orderStatus === "cancelled";
  const orderDate = new Date(order.orderDate).toLocaleDateString("es-PE", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const deliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })
    : null;
  const payment = order.payments[0];
  const payStatus: PaymentStatus =
    order.paymentStatus in PAYMENT_STATUS_CONFIG ? order.paymentStatus : "pending";
  const payConfig = PAYMENT_STATUS_CONFIG[payStatus];
  const canPay = payStatus !== "paid";

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)] sticky top-0 z-10">
        <div className="flex items-center justify-between h-[72px] px-5 lg:px-[60px]">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors">
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/mi-cuenta/pedidos" className="text-sm font-medium text-text-tertiary hover:text-berry-red transition-colors">Mis Pedidos</Link>
              <ChevronRight className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm font-semibold text-text-primary">{order.orderNumber}</span>
            </nav>
          </div>
          <h1 className="lg:hidden text-lg font-bold text-text-primary">{order.orderNumber}</h1>
          <h1 className="hidden lg:block text-2xl font-bold text-text-primary">Detalle del Pedido</h1>
          <div className="w-10 lg:w-0" />
        </div>
      </header>

      {/* Content */}
      <main className="px-5 lg:px-[60px] py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Status Card */}
            <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">{order.orderNumber}</h2>
                  <p className="text-sm text-text-tertiary mt-1">{orderDate}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full ${statusConfig.bgColor}`}>
                  <span className={`text-[13px] font-semibold ${statusConfig.color}`}>{statusConfig.label}</span>
                </div>
              </div>

              {/* Tracking Timeline */}
              {!isCancelled && (
                <div className="flex items-center justify-between">
                  {TRACKING_STEPS.map((step, idx) => {
                    const stepIdx = getStatusIndex(step.status);
                    const isCompleted = stepIdx <= currentStatusIdx;
                    const isCurrent = step.status === order.orderStatus;
                    const Icon = step.icon;

                    return (
                      <div key={step.status} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrent ? "bg-berry-red" : isCompleted ? "bg-berry-green" : "bg-bg-muted"
                          }`}>
                            <Icon className={`w-4 h-4 ${isCurrent || isCompleted ? "text-white" : "text-text-tertiary"}`} />
                          </div>
                          <span className={`text-[10px] lg:text-xs text-center ${isCurrent ? "font-semibold text-berry-red" : isCompleted ? "text-berry-green" : "text-text-tertiary"}`}>
                            {step.label}
                          </span>
                        </div>
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 ${stepIdx < currentStatusIdx ? "bg-berry-green" : "bg-bg-muted"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {deliveryDate && (
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border-subtle">
                  <Calendar className="w-4 h-4 text-text-tertiary" />
                  <span className="text-sm text-text-secondary">Entrega: {deliveryDate}</span>
                </div>
              )}
            </div>

            {/* Products */}
            <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h3 className="text-base font-bold text-text-primary mb-5">Productos</h3>
              <div className="flex flex-col gap-4">
                {order.items.map((item) => {
                  const imageUrl = item.product.images?.[0] ?? "";
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-bg-muted">
                        {imageUrl ? (
                          <Image src={imageUrl} alt={item.productName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary text-[10px]">
                            Sin img
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-xs text-text-tertiary">{item.variantName}</p>
                        )}
                        <p className="text-xs text-text-tertiary">{item.productSku}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-text-primary">S/ {parseFloat(item.totalPrice).toFixed(2)}</p>
                        <p className="text-xs text-text-tertiary">{parseFloat(item.quantity)} x S/ {parseFloat(item.unitPrice).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full lg:w-[400px]">
            {/* Order Summary */}
            <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h3 className="text-base font-bold text-text-primary mb-4">Resumen</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Subtotal</span>
                  <span className="text-sm font-medium text-text-primary">S/ {parseFloat(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Envío</span>
                  <span className="text-sm font-medium text-text-primary">
                    {parseFloat(order.deliveryFee) === 0 ? "Gratis" : `S/ ${parseFloat(order.deliveryFee).toFixed(2)}`}
                  </span>
                </div>
                {parseFloat(order.discountAmount) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Descuento</span>
                    <span className="text-sm font-medium text-berry-green">-S/ {parseFloat(order.discountAmount).toFixed(2)}</span>
                  </div>
                )}
                <div className="w-full h-px bg-border-subtle" />
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-text-primary">Total</span>
                  <span className="text-xl font-bold text-berry-red">S/ {parseFloat(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>

              {/* Payment info */}
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <CreditCard className="w-4 h-4 text-text-tertiary shrink-0" />
                    <span className="text-sm text-text-secondary truncate">
                      {payment
                        ? `${payment.paymentMethod === "card" ? "Tarjeta" : payment.paymentMethod}${
                            payment.paymentReference ? ` · ${payment.paymentReference}` : ""
                          }`
                        : "Pago"}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 h-6 inline-flex items-center rounded-full text-xs font-semibold ${payConfig.bgColor} ${payConfig.color}`}
                  >
                    {payConfig.label}
                  </span>
                </div>
                {payment?.transactionDate && (
                  <p className="text-xs text-text-tertiary mt-1 ml-6">
                    {new Date(payment.transactionDate).toLocaleDateString("es-PE")}
                  </p>
                )}

                {/* Pay actions for unpaid orders */}
                {canPay && (
                  <div className="mt-4 flex flex-col gap-2">
                    {payState === "error" && payError && (
                      <p className="text-sm text-berry-red">{payError}</p>
                    )}
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handlePayCard}
                      loading={payState === "paying"}
                      disabled={payState === "paying"}
                      className="w-full h-12"
                    >
                      <CreditCard className="w-4 h-4" />
                      {payState === "paying" ? "Procesando pago..." : "Pagar con tarjeta"}
                    </Button>
                    <Button
                      variant="whatsapp"
                      size="md"
                      onClick={handleYapePlin}
                      className="w-full h-12"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Pagar con Yape o Plin
                    </Button>
                    {payState === "paying" && (
                      <p className="text-xs text-text-tertiary text-center">
                        Si cerraste la ventana de Izipay, también puedes pagar con
                        Yape o Plin.
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <ShieldCheck className="w-4 h-4 text-text-tertiary" />
                      <span className="text-xs text-text-tertiary">
                        Pago seguro procesado por Izipay
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <h3 className="text-base font-bold text-text-primary mb-4">Datos de Entrega</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-text-tertiary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-text-primary">{order.deliveryAddress}</p>
                    {order.district && <p className="text-xs text-text-tertiary">{order.district.name}</p>}
                    {order.deliveryReference && <p className="text-xs text-text-tertiary">Ref: {order.deliveryReference}</p>}
                  </div>
                </div>
                {order.deliveryPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-text-tertiary shrink-0" />
                    <span className="text-sm text-text-primary">{order.deliveryPhone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-text-tertiary shrink-0" />
                  <span className="text-sm text-text-primary">{order.customer.fullName}</span>
                </div>
                {order.deliveryNotes && (
                  <p className="text-xs text-text-tertiary ml-7">Notas: {order.deliveryNotes}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mount point for the Izipay (Krypton) popin form. Rendered empty in
            the layout; the SDK overlays a modal when "Pagar con tarjeta" runs. */}
        {canPay && (
          <div id={IZIPAY_CONTAINER_ID}>
            <div className="kr-embedded" kr-popin="true" />
          </div>
        )}
      </main>
    </div>
  );
}
