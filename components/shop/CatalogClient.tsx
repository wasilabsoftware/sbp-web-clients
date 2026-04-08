"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SidebarFilters } from "@/components/shop/SidebarFilters";
import { CatalogProductCard } from "@/components/shop/CatalogProductCard";
import { Pagination } from "@/components/ui/Pagination";

interface FilterCategory {
  id: string;
  name: string;
}

interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  imageUrl: string | null;
  href: string;
}

interface CatalogClientProps {
  categories: FilterCategory[];
  products: CatalogProduct[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  selectedCategory: string;
  searchQuery: string;
}

export function CatalogClient({
  categories,
  products,
  currentPage,
  totalPages,
  totalProducts,
  selectedCategory,
  searchQuery: initialSearch,
}: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build URL with updated params
  const buildUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "" || value === "1" && key === "page" || value === "todos" && key === "categoria") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      const qs = params.toString();
      return `/tienda${qs ? `?${qs}` : ""}`;
    },
    [searchParams]
  );

  const navigateTo = useCallback(
    (updates: Record<string, string | undefined>) => {
      router.push(buildUrl(updates));
    },
    [router, buildUrl]
  );

  // Debounced search
  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigateTo({ search: value || undefined, page: undefined });
    }, 400);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Client-side price filter (API doesn't support price range)
  const displayProducts =
    minPrice > 0 || maxPrice > 0
      ? products.filter((p) => {
          if (minPrice > 0 && p.price < minPrice) return false;
          if (maxPrice > 0 && p.price > maxPrice) return false;
          return true;
        })
      : products;

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Catalog Hero */}
      <section className="bg-berry-red px-5 py-8 lg:px-20 lg:py-12 flex flex-col items-center gap-4 lg:gap-6">
        <h1 className="text-[28px] lg:text-[40px] font-bold text-text-inverse text-center lg:hidden">
          Catálogo
        </h1>
        <h1 className="hidden lg:block text-[40px] font-bold text-text-inverse text-center">
          Nuestro Catálogo
        </h1>
        <p className="hidden lg:block text-lg text-white/80 text-center">
          Encuentra los mejores berries y productos frescos del Perú
        </p>
        {/* Search Bar */}
        <div className="flex items-center gap-2.5 lg:gap-3 bg-bg-surface rounded-md px-4 lg:px-5 h-12 lg:h-[52px] w-full max-w-[600px]">
          <Search className="w-5 h-5 text-text-tertiary flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-sm lg:text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>
      </section>

      {/* Mobile Category Pills */}
      <div className="flex lg:hidden items-center gap-2 px-5 py-4 bg-bg-surface border-b border-border-subtle overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              navigateTo({ categoria: category.id, page: undefined })
            }
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-berry-red text-text-inverse"
                : "border border-border-subtle text-text-secondary"
            }`}
          >
            {category.name}
          </button>
        ))}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle text-[13px] font-medium text-text-secondary"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Precio
        </button>
      </div>

      {/* Mobile Price Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-bg-primary rounded-t-xl p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                Filtrar por precio
              </h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-text-tertiary mb-1.5 block">
                    Mínimo
                  </label>
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="S/ 0"
                    className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm"
                  />
                </div>
                <span className="text-text-tertiary mt-5">-</span>
                <div className="flex-1">
                  <label className="text-xs text-text-tertiary mb-1.5 block">
                    Máximo
                  </label>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="S/ 100"
                    className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full h-12 bg-berry-red text-text-inverse font-semibold rounded-md"
            >
              Aplicar filtro
            </button>
          </div>
        </div>
      )}

      {/* Catalog Content */}
      <section className="px-5 py-5 lg:px-20 lg:py-12 flex gap-10">
        {/* Desktop Sidebar */}
        <SidebarFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(id) =>
            navigateTo({ categoria: id, page: undefined })
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          onApplyFilters={() => {}}
        />

        {/* Products Area */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <span className="text-[15px] text-text-secondary">
              Mostrando {displayProducts.length} de {totalProducts} productos
            </span>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-border-subtle rounded-sm">
              <span className="text-sm text-text-secondary">
                Ordenar por: Más vendidos
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          {/* Products Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 -mx-0.5 lg:mx-0">
              {displayProducts.map((product) => (
                <CatalogProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-text-secondary mb-2">
                No se encontraron productos
              </p>
              <p className="text-sm text-text-tertiary">
                Intenta ajustar los filtros
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) =>
                navigateTo({ page: String(page) })
              }
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
