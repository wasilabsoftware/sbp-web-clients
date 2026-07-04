import Image from "next/image";
import Link from "next/link";
import { ImageOff, Package } from "lucide-react";
import { QuickAddButton } from "@/components/shop/QuickAddButton";

interface BundleCardProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

/**
 * Catalog card for a pack (product bundle). Links to /tienda/packs/[slug]
 * for the detail view; the quick-add button adds the whole pack to the cart
 * at its calculated price.
 */
export function BundleCard({
  id,
  slug,
  name,
  category,
  description,
  price,
  imageUrl,
}: BundleCardProps) {
  const href = `/tienda/packs/${slug}`;

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
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-berry-green text-text-inverse text-[11px] font-semibold px-2 py-0.5 rounded-full">
            <Package className="w-3 h-3" />
            Pack
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 lg:gap-2.5 p-3 lg:p-4 flex-1">
        <span className="hidden lg:block text-xs font-semibold text-berry-green">
          {category}
        </span>
        <Link href={href}>
          <h3 className="text-sm lg:text-base font-semibold text-text-primary hover:text-berry-red transition-colors">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="text-[12px] lg:text-[13px] text-text-tertiary line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-[15px] lg:text-lg font-bold text-berry-red">
            S/ {price.toFixed(2)}
          </span>
          <QuickAddButton bundleId={id} size="sm" />
        </div>
      </div>
    </div>
  );
}
