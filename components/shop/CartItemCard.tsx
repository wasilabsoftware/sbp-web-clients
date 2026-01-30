"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const total = item.unitPrice * item.quantity;

  const decrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const increase = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  return (
    <div className="relative flex items-start lg:items-center gap-3 lg:gap-5 bg-bg-surface rounded-lg p-4 lg:p-5 w-full">
      {/* Mobile: Delete Button - Top Right */}
      <button
        onClick={() => onRemove(item.id)}
        className="lg:hidden absolute top-3 right-3 w-8 h-8 rounded-full bg-berry-red-light flex items-center justify-center hover:bg-berry-red hover:text-text-inverse transition-colors group"
      >
        <Trash2 className="w-4 h-4 text-berry-red group-hover:text-text-inverse" />
      </button>

      {/* Product Image */}
      <div className="relative w-20 h-20 lg:w-[100px] lg:h-[100px] rounded-md overflow-hidden shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 lg:gap-2 flex-1 min-w-0">
        <h3 className="text-[15px] lg:text-base font-semibold text-text-primary truncate pr-10 lg:pr-0">
          {item.name}
        </h3>
        <p className="text-[13px] lg:text-sm text-text-secondary">
          {item.description}
        </p>

        {/* Mobile: Quantity controls then Price below */}
        <div className="flex lg:hidden flex-col gap-2 mt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={decrease}
              disabled={item.quantity <= 1}
              className="w-7 h-7 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5 text-text-secondary" />
            </button>
            <span className="text-base font-semibold text-text-primary min-w-[16px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={increase}
              className="w-7 h-7 rounded-full bg-berry-red flex items-center justify-center hover:bg-berry-red-dark transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-text-inverse" />
            </button>
          </div>
          <p className="text-base font-bold text-berry-red text-right">
            S/ {total.toFixed(2)}
          </p>
        </div>

        {/* Desktop: Unit price */}
        <p className="hidden lg:block text-sm text-text-tertiary">
          S/ {item.unitPrice.toFixed(2)} c/u
        </p>
      </div>

      {/* Desktop: Quantity Controls */}
      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={decrease}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4 text-text-secondary" />
        </button>
        <span className="text-base font-semibold text-text-primary min-w-5 text-center">
          {item.quantity}
        </span>
        <button
          onClick={increase}
          className="w-8 h-8 rounded-full bg-berry-red flex items-center justify-center hover:bg-berry-red-dark transition-colors"
        >
          <Plus className="w-4 h-4 text-text-inverse" />
        </button>
      </div>

      {/* Desktop: Item Total */}
      <p className="hidden lg:block text-lg font-bold text-text-primary min-w-[100px] text-right">
        S/ {total.toFixed(2)}
      </p>

      {/* Desktop: Delete Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="hidden lg:flex w-9 h-9 rounded-full bg-berry-red-light items-center justify-center hover:bg-berry-red hover:text-text-inverse transition-colors group shrink-0"
      >
        <Trash2 className="w-[18px] h-[18px] text-berry-red group-hover:text-text-inverse" />
      </button>
    </div>
  );
}
