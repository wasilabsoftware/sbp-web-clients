"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CartItemCard } from "@/components/shop/CartItemCard";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { useCart } from "@/hooks/useCart";

export default function CarritoPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getSubtotal, getItemCount } =
    useCart();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 10;
  const itemCount = getItemCount();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const itemsText = items
      .map(
        (item) =>
          `• ${item.name} (${item.quantity}x) - S/ ${(item.unitPrice * item.quantity).toFixed(2)}`
      )
      .join("\n");
    const message = encodeURIComponent(
      `¡Hola! Me gustaría hacer un pedido:\n\n${itemsText}\n\nTotal: S/ ${(subtotal + shipping).toFixed(2)}`
    );
    window.open(`https://wa.me/51952805608?text=${message}`, "_blank");
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
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">Tu Carrito</h1>
        <div className="w-10 h-10 rounded-full bg-berry-red flex items-center justify-center">
          <span className="text-sm font-bold text-text-inverse">{itemCount}</span>
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
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 bg-bg-surface rounded-lg">
                  <p className="text-lg text-text-secondary">
                    Tu carrito está vacío
                  </p>
                  <Link
                    href="/productos"
                    className="text-berry-red font-medium hover:underline"
                  >
                    Ver productos
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-[400px]">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                onCheckout={handleCheckout}
                onWhatsAppOrder={handleWhatsAppOrder}
              />
            </div>
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
