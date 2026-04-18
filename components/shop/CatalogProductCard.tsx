import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { QuickAddButton } from "@/components/shop/QuickAddButton";

const PLACEHOLDER_IMAGE = "/placeholder-product.svg";

interface CatalogProductCardProps {
  id: string;
  name: string;
  category: string;
  categoryColor?: "red" | "green";
  weight: string;
  price: number;
  imageUrl: string | null;
  href: string;
}

export function CatalogProductCard({
  id,
  name,
  category,
  categoryColor = "red",
  weight,
  price,
  imageUrl,
  href,
}: CatalogProductCardProps) {
  const categoryColors = {
    red: "text-berry-red",
    green: "text-berry-green",
  };

  return (
    <div className="flex flex-col bg-bg-surface rounded-lg shadow-[0_2px_10px_rgba(26,20,18,0.06)] lg:shadow-card hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={href} className="block">
        <div className="relative h-[120px] lg:h-[180px] w-full overflow-hidden rounded-t-lg bg-bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <ImageOff className="w-8 h-8 text-text-tertiary" />
            </div>
          )}
        </div>
      </Link>

      {/* Mobile: Simple layout */}
      <div className="flex lg:hidden flex-col gap-1 p-3">
        <Link href={href}>
          <h3 className="text-sm font-semibold text-text-primary">
            {name}
          </h3>
        </Link>
        <span className="text-[15px] font-bold text-berry-red">
          S/ {price.toFixed(2)}
        </span>
      </div>

      {/* Desktop: Full layout */}
      <div className="hidden lg:flex flex-col gap-2.5 p-4">
        <span
          className={`text-xs font-semibold ${categoryColors[categoryColor]}`}
        >
          {category}
        </span>
        <Link href={href}>
          <h3 className="text-base font-semibold text-text-primary hover:text-berry-red transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-[13px] text-text-tertiary">{weight}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-berry-red">
            S/ {price.toFixed(2)}
          </span>
          <QuickAddButton variantId={id} size="sm" />
        </div>
      </div>
    </div>
  );
}
