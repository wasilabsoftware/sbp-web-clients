import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  category?: string;
  categoryColor?: "red" | "green";
  description?: string;
  price: number;
  imageUrl: string;
  href: string;
  compact?: boolean;
}

export function ProductCard({
  name,
  category,
  categoryColor = "red",
  description,
  price,
  imageUrl,
  href,
  compact = false,
}: ProductCardProps) {
  const categoryColors = {
    red: "text-berry-red",
    green: "text-berry-green",
  };

  if (compact) {
    // Mobile compact version
    return (
      <div className="flex flex-col bg-bg-surface rounded-lg shadow-[0_2px_12px_rgba(26,20,18,0.06)] overflow-hidden">
        <Link href={href} className="block">
          <div className="relative h-[130px] w-full overflow-hidden rounded-t-lg">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-1.5 p-3">
          <Link href={href}>
            <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
          </Link>
          <span className="text-base font-bold text-berry-red">
            S/ {price.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  // Desktop full version
  return (
    <div className="flex flex-col bg-bg-surface rounded-lg shadow-card hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={href} className="block">
        <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-5">
        {category && (
          <span
            className={`text-xs font-semibold ${categoryColors[categoryColor]}`}
          >
            {category}
          </span>
        )}
        <Link href={href}>
          <h3 className="text-lg font-semibold text-text-primary hover:text-berry-red transition-colors">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="text-sm text-text-tertiary">{description}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-berry-red">
            S/ {price.toFixed(2)}
          </span>
          <button className="w-10 h-10 rounded-full bg-berry-red flex items-center justify-center hover:bg-berry-red-dark transition-colors">
            <Plus className="w-4.5 h-4.5 text-text-inverse" />
          </button>
        </div>
      </div>
    </div>
  );
}
