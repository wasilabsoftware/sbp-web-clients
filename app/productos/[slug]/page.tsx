import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { createProductMetadata } from "@/lib/seo/metadata";
import { products, getProductBySlug } from "@/lib/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const defaultWeight = product.weights[product.defaultWeightIndex];

  return createProductMetadata({
    name: product.name,
    description: product.description,
    image: product.images[0],
    price: defaultWeight.price,
    slug,
  });
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
          weights: product.weights,
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
        <ProductDetailClient
          product={{
            id: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            weights: product.weights,
            defaultWeightIndex: product.defaultWeightIndex,
            rating: product.rating,
            reviewCount: product.reviewCount,
            inStock: product.inStock,
            images: product.images,
          }}
        />
      </main>
    </div>
  );
}
