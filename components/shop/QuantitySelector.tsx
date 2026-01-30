"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-[15px] font-semibold text-text-primary">
        Cantidad
      </span>
      <div className="flex items-center">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="w-12 h-12 rounded-l-xl bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-[18px] h-[18px] text-text-secondary" />
        </button>
        <div className="w-16 h-12 bg-bg-surface border-y border-border-subtle flex items-center justify-center">
          <span className="text-lg font-semibold text-text-primary">
            {quantity}
          </span>
        </div>
        <button
          onClick={increase}
          disabled={quantity >= max}
          className="w-12 h-12 rounded-r-xl bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-[18px] h-[18px] text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
