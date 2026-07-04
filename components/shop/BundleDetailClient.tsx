"use client";

import { useState } from "react";
import {
  CircleCheck,
  ShoppingBag,
  MessageCircle,
  Truck,
  Leaf,
  ShieldCheck,
  Check,
  ImageOff,
  Loader2,
  Package,
} from "lucide-react";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { QuantitySelector } from "@/components/shop/QuantitySelector";
import { useCart } from "@/hooks/useCart";

const features = [
  { icon: Truck, label: "Delivery al día siguiente" },
  { icon: Leaf, label: "100% Natural" },
  { icon: ShieldCheck, label: "Calidad garantizada" },
];

interface BundleDetailClientProps {
  bundle: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    images: string[];
    components: { name: string; quantity: string }[];
  };
}

function formatComponentQuantity(quantity: string): string {
  const num = parseFloat(quantity);
  if (!Number.isFinite(num) || num === 1) return "";
  return ` x${num % 1 === 0 ? num.toFixed(0) : num}`;
}

export function BundleDetailClient({ bundle }: BundleDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addBundle } = useCart();

  const totalPrice = bundle.price * quantity;
  const hasImages = bundle.images.length > 0;

  const handleAddToCart = async () => {
    if (isAdding || isAdded) return;
    setIsAdding(true);
    try {
      await addBundle(bundle.id, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch {
      // Error is handled by the cart store
    } finally {
      setIsAdding(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `¡Hola! Me gustaría pedir:\n\n• ${bundle.name} (${quantity}x) - S/ ${totalPrice.toFixed(2)}\n\nTotal: S/ ${totalPrice.toFixed(2)}`
    );
    window.open(`https://wa.me/51952805608?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px]">
      {/* Gallery or Placeholder */}
      {hasImages ? (
        <ProductGallery images={bundle.images} productName={bundle.name} />
      ) : (
        <div className="flex items-center justify-center w-full lg:w-[560px] h-[300px] lg:h-[480px] rounded-xl lg:rounded-3xl bg-bg-muted">
          <ImageOff className="w-16 h-16 text-text-tertiary" />
        </div>
      )}

      {/* Bundle Info */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Category Badge */}
        <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-berry-green/10 text-berry-green text-[13px] font-semibold rounded-full w-fit">
          <Package className="w-3.5 h-3.5" />
          {bundle.category}
        </span>

        {/* Name */}
        <h1 className="text-2xl lg:text-4xl font-bold text-text-primary">
          {bundle.name}
        </h1>

        {/* Description */}
        {bundle.description && (
          <p className="text-base text-text-secondary max-w-[500px]">
            {bundle.description}
          </p>
        )}

        {/* What's inside */}
        {bundle.components.length > 0 && (
          <div className="flex flex-col gap-2.5 bg-bg-surface rounded-xl p-4 lg:p-5 max-w-[500px]">
            <h2 className="text-sm font-bold text-text-primary">
              ¿Qué incluye este pack?
            </h2>
            <ul className="flex flex-col gap-2">
              {bundle.components.map((component, index) => (
                <li
                  key={`${component.name}-${index}`}
                  className="flex items-center gap-2"
                >
                  <CircleCheck className="w-4 h-4 text-berry-green shrink-0" />
                  <span className="text-sm text-text-secondary">
                    {component.name}
                    {formatComponentQuantity(component.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price Section */}
        <div className="flex flex-col gap-2">
          <span className="text-2xl lg:text-[32px] font-bold text-berry-red">
            S/ {bundle.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5">
            <CircleCheck className="w-4 h-4 text-berry-green" />
            <span className="text-sm font-medium text-berry-green">
              Entrega al día siguiente
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-subtle w-full" />

        {/* Quantity Selector */}
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            className={`relative w-full h-14 ${
              isAdded
                ? "bg-berry-green"
                : "bg-berry-red hover:bg-berry-red-dark"
            } text-text-inverse rounded-xl flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-colors disabled:cursor-not-allowed`}
          >
            {isAdding ? (
              <>
                <Loader2 className="w-[22px] h-[22px] animate-spin" />
                Agregando...
              </>
            ) : isAdded ? (
              <>
                <Check className="w-[22px] h-[22px] animate-pop-in" />
                ¡Agregado al Carrito!
                <span
                  className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 text-text-inverse text-base font-bold animate-float-up"
                  aria-hidden="true"
                >
                  +{quantity}
                </span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-[22px] h-[22px]" />
                Agregar al Carrito - S/ {totalPrice.toFixed(2)}
              </>
            )}
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="w-full h-14 bg-whatsapp hover:opacity-90 text-text-inverse rounded-xl flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-opacity"
          >
            <MessageCircle className="w-[22px] h-[22px]" />
            Pedir por WhatsApp
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-6">
          {features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-2">
              <feature.icon className="w-[18px] h-[18px] text-text-tertiary" />
              <span className="text-[13px] font-medium text-text-secondary">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
