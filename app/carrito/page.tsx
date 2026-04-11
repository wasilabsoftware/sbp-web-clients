"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CartItemCard } from "@/components/shop/CartItemCard";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { useCart } from "@/hooks/useCart";

export default function CarritoPage() {
  const router = useRouter();
  const {
    cart,
    isLoading,
    isUpdating,
    fetchCart,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items ?? [];
  const subtotal = parseFloat(cart?.summary.subtotal ?? "0");
  const shipping = parseFloat(cart?.summary.deliveryFee ?? "0");
  const itemCount = cart?.summary.itemCount ?? 0;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemove = (itemId: string) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const itemsText = items
      .map(
        (item) =>
          `• ${item.variant.name} (${item.quantity}x) - S/ ${(parseFloat(item.unitPrice) * parseFloat(item.quantity)).toFixed(2)}`
      )
      .join("\n");
    const total = (subtotal + shipping).toFixed(2);
    const message = encodeURIComponent(
      `¡Hola! Me gustaría hacer un pedido:\n\n${itemsText}\n\nTotal: S/ ${total}`
    );
    window.open(`https://wa.me/51952805608?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
        </div>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold text-text-primary">Tu Carrito</h1>
        <div className="w-10 h-10 rounded-full bg-berry-red flex items-center justify-center">
          <span className="text-sm font-bold text-text-inverse">
            {itemCount}
          </span>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20 py-5 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-between">
            {/* Cart Items Section */}
            <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[720px]">
              {/* Desktop Title */}
              <div className="hidden lg:flex items-center justify-between w-full">
                <h1 className="text-[28px] font-bold text-text-primary">
                  Tu Carrito
                </h1>
                <span className="text-[15px] text-text-secondary">
                  {itemCount} {itemCount === 1 ? "producto" : "productos"}
                </span>
              </div>

              {/* Cart Items */}
              {items.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemove}
                      disabled={isUpdating}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 bg-bg-surface rounded-lg">
                  <p className="text-lg text-text-secondary">
                    Tu carrito está vacío
                  </p>
                  <Link
                    href="/tienda"
                    className="text-berry-red font-medium hover:underline"
                  >
                    Ver productos
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            {items.length > 0 && (
              <div className="w-full lg:w-[400px]">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  onCheckout={handleCheckout}
                  onWhatsAppOrder={handleWhatsAppOrder}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}
