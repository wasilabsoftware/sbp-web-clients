import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: number;
}

export function BlogPostCard({
  slug,
  title,
  excerpt,
  category,
  image,
  imageAlt,
  publishedAt,
  readingTime,
}: BlogPostCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-bg-surface border border-border-subtle rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative w-full h-[180px] lg:h-[200px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-berry-red bg-berry-red-light px-2.5 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-text-tertiary">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{readingTime} min</span>
          </div>
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="text-base lg:text-lg font-bold text-text-primary hover:text-berry-red transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-tertiary">{formattedDate}</span>
          <Link
            href={`/blog/${slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-berry-red hover:underline"
          >
            Leer más
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
