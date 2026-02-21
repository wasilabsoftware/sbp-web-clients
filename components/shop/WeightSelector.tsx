"use client";

interface WeightOption {
  label: string;
  price: number;
  unit: string;
}

interface WeightSelectorProps {
  weights: WeightOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function WeightSelector({
  weights,
  selectedIndex,
  onSelect,
}: WeightSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-text-primary">
        Presentación
      </label>
      <div className="flex flex-wrap gap-2">
        {weights.map((weight, index) => (
          <button
            key={weight.label}
            onClick={() => onSelect(index)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              selectedIndex === index
                ? "bg-berry-red text-text-inverse"
                : "border border-border-subtle text-text-secondary hover:border-berry-red/30"
            }`}
          >
            {weight.label} — S/ {weight.price.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
}
