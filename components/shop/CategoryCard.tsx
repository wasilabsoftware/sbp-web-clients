import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  productCount: number;
  imageUrl?: string;
  bgColor?: string;
  href: string;
}

export function CategoryCard({
  title,
  productCount,
  imageUrl,
  bgColor = "bg-berry-green",
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 lg:gap-4 bg-bg-surface lg:rounded-lg p-0 lg:p-6 w-[100px] lg:w-[200px] lg:h-[240px] lg:shadow-card lg:hover:shadow-lg transition-shadow"
    >
      <div
        className={`w-20 h-20 lg:w-[120px] lg:h-[120px] rounded-full overflow-hidden ${
          !imageUrl ? bgColor : ""
        }`}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-0.5 lg:gap-1">
        <h3 className="text-[13px] lg:text-lg font-medium lg:font-semibold text-text-primary">
          {title}
        </h3>
        <p className="hidden lg:block text-sm text-text-tertiary">
          {productCount} productos
        </p>
      </div>
    </Link>
  );
}
