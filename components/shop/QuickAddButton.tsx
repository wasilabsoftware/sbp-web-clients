"use client";

import { useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface QuickAddButtonProps {
  variantId: string;
  size?: "sm" | "md";
}

type Status = "idle" | "loading" | "success";

export function QuickAddButton({ variantId, size = "md" }: QuickAddButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [status, setStatus] = useState<Status>("idle");
  const [burstKey, setBurstKey] = useState(0);

  const dimClass = size === "sm" ? "w-9 h-9" : "w-10 h-10";
  const iconClass = size === "sm" ? "w-4 h-4" : "w-4.5 h-4.5";

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== "idle") return;

    setStatus("loading");
    try {
      await addItem(variantId);
      setStatus("success");
      setBurstKey((k) => k + 1);
      setTimeout(() => setStatus("idle"), 1100);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        disabled={status !== "idle"}
        aria-label="Agregar al carrito"
        className={`${dimClass} rounded-full flex items-center justify-center transition-all duration-200 ${
          status === "success"
            ? "bg-berry-green scale-110"
            : "bg-berry-red hover:bg-berry-red-dark active:scale-95"
        } disabled:cursor-not-allowed shadow-sm`}
      >
        {status === "loading" && (
          <Loader2 className={`${iconClass} text-text-inverse animate-spin`} />
        )}
        {status === "success" && (
          <Check
            className={`${iconClass} text-text-inverse animate-pop-in`}
            aria-hidden="true"
          />
        )}
        {status === "idle" && (
          <Plus className={`${iconClass} text-text-inverse`} aria-hidden="true" />
        )}
      </button>

      {burstKey > 0 && status === "success" && (
        <span
          key={burstKey}
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-berry-red text-sm font-bold animate-float-up"
          aria-hidden="true"
        >
          +1
        </span>
      )}
    </div>
  );
}
