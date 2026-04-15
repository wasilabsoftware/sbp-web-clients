"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "@/components/shop/CategoryCard";

interface Category {
  title: string;
  productCount: number;
  imageUrl?: string;
  href: string;
}

interface CategoriesCarouselProps {
  categories: Category[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);

    // Calculate active dot based on scroll position (mobile)
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 100;
    const gap = 12; // gap-3 = 12px
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, categories.length - 1));
  }, [categories.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 200;
    const scrollAmount = cardWidth + 24; // card + gap

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 100;
    const gap = 12;

    el.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  // Number of dots for mobile (group categories to avoid too many dots)
  const totalDots = categories.length;

  return (
    <div className="relative">
      {/* Desktop arrow buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-surface shadow-md border border-border-subtle hover:bg-bg-primary transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-bg-surface shadow-md border border-border-subtle hover:bg-bg-primary transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 lg:gap-6 overflow-x-auto pb-3 lg:pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <div key={category.title} className="snap-start flex-shrink-0">
            <CategoryCard {...category} />
          </div>
        ))}
      </div>

      {/* Mobile dots indicator */}
      {totalDots > 1 && (
        <div className="flex lg:hidden justify-center gap-1.5 mt-4">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-berry-red"
                  : "w-2 h-2 bg-border-strong"
              }`}
              aria-label={`Ir a categoría ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
