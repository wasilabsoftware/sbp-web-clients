"use client";

import { useState } from "react";
import {
  Star,
  CircleCheck,
  ShoppingBag,
  MessageCircle,
  Truck,
  Leaf,
  ShieldCheck,
  Check,
} from "lucide-react";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { QuantitySelector } from "@/components/shop/QuantitySelector";
import { useCart } from "@/hooks/useCart";

const features = [
  { icon: Truck, label: "Envío gratis" },
  { icon: Leaf, label: "100% Natural" },
  { icon: ShieldCheck, label: "Calidad garantizada" },
];

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    unit: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    images: string[];
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        description: product.unit,
        unitPrice: product.price,
        imageUrl: product.images[0],
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `¡Hola! Me gustaría pedir:\n\n• ${product.name} (${quantity}x) - S/ ${totalPrice.toFixed(2)}\n\nTotal: S/ ${totalPrice.toFixed(2)}`
    );
    window.open(`https://wa.me/51999999999?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px]">
      {/* Gallery */}
      <ProductGallery images={product.images} productName={product.name} />

      {/* Product Info */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Category Badge */}
        <span className="px-3.5 py-1.5 bg-berry-red-light text-berry-red text-[13px] font-semibold rounded-full w-fit">
          {product.category}
        </span>

        {/* Product Name */}
        <h1 className="text-2xl lg:text-4xl font-bold text-text-primary">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-[18px] h-[18px] ${
                  star <= Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-border-subtle text-border-subtle"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-text-secondary">
            {product.rating} ({product.reviewCount} reseñas)
          </span>
        </div>

        {/* Description */}
        <p className="text-base text-text-secondary max-w-[500px]">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <span className="text-2xl lg:text-[32px] font-bold text-berry-red">
              S/ {product.price.toFixed(2)}
            </span>
            <span className="text-lg text-text-tertiary">
              / {product.unit}
            </span>
          </div>
          {product.inStock && (
            <div className="flex items-center gap-1.5">
              <CircleCheck className="w-4 h-4 text-berry-green" />
              <span className="text-sm font-medium text-berry-green">
                En stock - Entrega hoy
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border-subtle w-full" />

        {/* Quantity Selector */}
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className={`w-full h-14 ${
              isAdded
                ? "bg-berry-green"
                : "bg-berry-red hover:bg-berry-red-dark"
            } text-text-inverse rounded-xl flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-colors`}
          >
            {isAdded ? (
              <>
                <Check className="w-[22px] h-[22px]" />
                ¡Agregado al Carrito!
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
