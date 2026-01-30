"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
  count?: number;
}

interface SidebarFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  onApplyFilters: () => void;
}

export function SidebarFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onApplyFilters,
}: SidebarFiltersProps) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  return (
    <aside className="hidden lg:flex flex-col gap-8 w-[280px] flex-shrink-0">
      {/* Categories Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-text-primary">Categorías</h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="flex items-center gap-3 w-full text-left"
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  selectedCategory === category.id
                    ? "bg-berry-red"
                    : "border-2 border-border-strong"
                }`}
              >
                {selectedCategory === category.id && (
                  <Check className="w-3 h-3 text-text-inverse" />
                )}
              </div>
              <span
                className={`text-[15px] ${
                  selectedCategory === category.id
                    ? "font-medium text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-text-primary">Precio</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="number"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(Number(e.target.value))}
              placeholder="S/ 0"
              className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm text-text-secondary focus:outline-none focus:border-berry-red"
            />
          </div>
          <span className="text-text-tertiary">-</span>
          <div className="flex-1">
            <input
              type="number"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
              placeholder="S/ 100"
              className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm text-text-secondary focus:outline-none focus:border-berry-red"
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        variant="primary"
        className="w-full h-12"
        onClick={() => {
          onPriceChange(localMinPrice, localMaxPrice);
          onApplyFilters();
        }}
      >
        Aplicar Filtros
      </Button>
    </aside>
  );
}
