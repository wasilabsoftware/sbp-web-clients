"use client";

import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SidebarFilters } from "@/components/shop/SidebarFilters";
import { CatalogProductCard } from "@/components/shop/CatalogProductCard";
import { Pagination } from "@/components/ui/Pagination";

const categories = [
  { id: "todos", name: "Todos" },
  { id: "berries", name: "Berries" },
  { id: "frutos-secos", name: "Frutos Secos" },
  { id: "deshidratados", name: "Deshidratados" },
  { id: "especiales", name: "Especiales" },
];

const allProducts = [
  {
    id: "1",
    name: "Fresas Premium",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red" as const,
    weight: "500g",
    price: 18.9,
    imageUrl: "https://images.unsplash.com/photo-1636119708661-91ec3f9a6eb2?w=600",
    href: "/productos/fresas-premium",
  },
  {
    id: "2",
    name: "Arándanos Frescos",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red" as const,
    weight: "250g",
    price: 24.9,
    imageUrl: "https://images.unsplash.com/photo-1758820609344-b01c8c6b3406?w=600",
    href: "/productos/arandanos-frescos",
  },
  {
    id: "3",
    name: "Moras Silvestres",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red" as const,
    weight: "300g",
    price: 19.9,
    imageUrl: "https://images.unsplash.com/photo-1723746546836-85e9857c5d19?w=600",
    href: "/productos/moras-silvestres",
  },
  {
    id: "4",
    name: "Aguaymanto",
    category: "Especiales",
    categoryId: "especiales",
    categoryColor: "green" as const,
    weight: "200g",
    price: 15.9,
    imageUrl: "https://images.unsplash.com/photo-1698747789735-011173b068f2?w=600",
    href: "/productos/aguaymanto",
  },
  {
    id: "5",
    name: "Cerezas",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red" as const,
    weight: "250g",
    price: 29.9,
    imageUrl: "https://images.unsplash.com/photo-1530176611600-d05a6387d07c?w=600",
    href: "/productos/cerezas",
  },
  {
    id: "6",
    name: "Pistachos",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green" as const,
    weight: "150g",
    price: 22.9,
    imageUrl: "https://images.unsplash.com/photo-1721976505728-1d2a5ee8de5f?w=600",
    href: "/productos/pistachos",
  },
  {
    id: "7",
    name: "Frambuesas",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red" as const,
    weight: "200g",
    price: 21.9,
    imageUrl: "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=600",
    href: "/productos/frambuesas",
  },
  {
    id: "8",
    name: "Almendras",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green" as const,
    weight: "200g",
    price: 18.9,
    imageUrl: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600",
    href: "/productos/almendras",
  },
  {
    id: "9",
    name: "Arándanos Deshidratados",
    category: "Deshidratados",
    categoryId: "deshidratados",
    categoryColor: "green" as const,
    weight: "100g",
    price: 12.9,
    imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600",
    href: "/productos/arandanos-deshidratados",
  },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "todos" || product.categoryId === selectedCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Catalog Hero */}
      <section className="bg-berry-red px-5 py-8 lg:px-20 lg:py-12 flex flex-col items-center gap-4 lg:gap-6">
        {/* Mobile: Simple title */}
        <h1 className="text-[28px] lg:text-[40px] font-bold text-text-inverse text-center lg:hidden">
          Catálogo
        </h1>
        {/* Desktop: Full title with subtitle */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm lg:text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>
      </section>

      {/* Mobile Category Pills */}
      <div className="flex lg:hidden items-center gap-2 px-5 py-4 bg-bg-surface border-b border-border-subtle overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentPage(1);
            }}
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

            {/* Price Range */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-text-tertiary mb-1.5 block">Mínimo</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="S/ 0"
                    className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm"
                  />
                </div>
                <span className="text-text-tertiary mt-5">-</span>
                <div className="flex-1">
                  <label className="text-xs text-text-tertiary mb-1.5 block">Máximo</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="S/ 100"
                    className="w-full h-11 px-3 bg-bg-surface border border-border-subtle rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage(1);
                setShowMobileFilters(false);
              }}
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
          onCategoryChange={setSelectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          onApplyFilters={() => setCurrentPage(1)}
        />

        {/* Products Area */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <span className="text-[15px] text-text-secondary">
              Mostrando {filteredProducts.length} productos
            </span>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-border-subtle rounded-sm">
              <span className="text-sm text-text-secondary">
                Ordenar por: Más vendidos
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 -mx-0.5 lg:mx-0">
              {paginatedProducts.map((product) => (
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
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
