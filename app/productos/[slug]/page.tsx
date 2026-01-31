import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { createProductMetadata } from "@/lib/seo/metadata";

// Mock products data - in production this would come from a database
const products: Record<string, {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
}> = {
  "fresas-premium": {
    id: "fresas-premium",
    name: "Fresas Premium",
    category: "Berries",
    description:
      "Fresas frescas cultivadas en los valles del Perú. Seleccionadas a mano para garantizar la mejor calidad. Perfectas para postres, batidos o disfrutar directamente.",
    price: 18.9,
    unit: "500g",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1525604155062-d5b01d84ad81?w=800&q=80",
      "https://images.unsplash.com/photo-1569613562636-7492d9f77aed?w=800&q=80",
      "https://images.unsplash.com/photo-1599034596263-63c68c75ef8b?w=800&q=80",
      "https://images.unsplash.com/photo-1645453146680-7d7304b5543b?w=800&q=80",
    ],
  },
  "arandanos-frescos": {
    id: "arandanos-frescos",
    name: "Arándanos Frescos",
    category: "Berries",
    description:
      "Arándanos frescos y jugosos, ricos en antioxidantes. Perfectos para smoothies, ensaladas o como snack saludable.",
    price: 24.9,
    unit: "250g",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1758820609344-b01c8c6b3406?w=800&q=80",
    ],
  },
  "moras-silvestres": {
    id: "moras-silvestres",
    name: "Moras Silvestres",
    category: "Berries",
    description:
      "Moras silvestres con sabor intenso y dulce natural. Ideales para postres, mermeladas o disfrutar al natural.",
    price: 19.9,
    unit: "300g",
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1723746546836-85e9857c5d19?w=800&q=80",
    ],
  },
  "aguaymanto": {
    id: "aguaymanto",
    name: "Aguaymanto",
    category: "Especiales",
    description:
      "Aguaymanto peruano, superfood andino rico en vitaminas A, B y C. Sabor agridulce único, perfecto como snack o en ensaladas.",
    price: 15.9,
    unit: "200g",
    rating: 4.8,
    reviewCount: 72,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1698747789735-011173b068f2?w=800&q=80",
    ],
  },
};

// TODO: Replace with database query
async function getProduct(slug: string) {
  return products[slug] || null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return createProductMetadata({
    name: product.name,
    description: product.description,
    image: product.images[0],
    price: product.price,
    slug,
  });
}

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Inicio", url: "/" },
    { name: "Catálogo", url: "/productos" },
    { name: product.name },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Structured Data */}
      <ProductSchema
        product={{
          name: product.name,
          description: product.description,
          images: product.images,
          price: product.price,
          slug,
          inStock: product.inStock,
          rating: product.rating,
          reviewCount: product.reviewCount,
        }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 px-5 lg:px-20 py-4 bg-bg-surface"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-sm text-text-tertiary hover:text-berry-red transition-colors"
        >
          Inicio
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" aria-hidden="true" />
        <Link
          href="/productos"
          className="text-sm text-text-tertiary hover:text-berry-red transition-colors"
        >
          Catálogo
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" aria-hidden="true" />
        <span className="text-sm font-medium text-text-primary">
          {product.name}
        </span>
      </nav>

      {/* Product Content */}
      <main className="px-5 lg:px-20 py-8 lg:py-12">
        <ProductDetailClient product={product} />
      </main>
    </div>
  );
}
