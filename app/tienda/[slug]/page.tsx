import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { createProductMetadata } from "@/lib/seo/metadata";
import { getStorefrontVariantById } from "@/lib/services/storefront.service";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v?: string }>;
}

async function getVariant(variantId: string) {
  try {
    return await getStorefrontVariantById(variantId);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { v: variantId } = await searchParams;

  if (!variantId) {
    return { title: "Producto no encontrado" };
  }

  const variant = await getVariant(variantId);

  if (!variant) {
    return { title: "Producto no encontrado" };
  }

  const image =
    variant.images?.[0] ?? variant.product.images?.[0] ?? "";
  const price = variant.calculatedPrice
    ? parseFloat(variant.calculatedPrice)
    : parseFloat(variant.product.basePrice);

  return createProductMetadata({
    name: variant.name,
    description:
      variant.product.description ?? variant.product.shortDescription ?? "",
    image,
    price,
    slug,
  });
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { v: variantId } = await searchParams;

  if (!variantId) {
    notFound();
  }

  const variant = await getVariant(variantId);

  if (!variant) {
    notFound();
  }

  const images = variant.images ?? variant.product.images ?? [];
  const price = variant.calculatedPrice
    ? parseFloat(variant.calculatedPrice)
    : parseFloat(variant.product.basePrice);
  const rating = variant.product.averageRating
    ? parseFloat(variant.product.averageRating)
    : 0;
  const weightInfo = [
    variant.weight ? `${variant.weight}g` : null,
    variant.packaging,
    variant.presentation,
  ]
    .filter(Boolean)
    .join(" · ");

  const breadcrumbItems = [
    { name: "Inicio", url: "/" },
    { name: "Tienda", url: "/tienda" },
    { name: variant.name },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Structured Data */}
      <ProductSchema
        product={{
          name: variant.name,
          description:
            variant.product.description ??
            variant.product.shortDescription ??
            "",
          images,
          weights: [{ label: weightInfo || variant.name, price, unit: weightInfo || "und" }],
          slug,
          inStock: variant.stockQuantity > 0,
          rating: rating || undefined,
          reviewCount: variant.product.reviewCount || undefined,
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
        <ChevronRight
          className="w-3.5 h-3.5 text-text-tertiary"
          aria-hidden="true"
        />
        <Link
          href="/tienda"
          className="text-sm text-text-tertiary hover:text-berry-red transition-colors"
        >
          Catálogo
        </Link>
        <ChevronRight
          className="w-3.5 h-3.5 text-text-tertiary"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-text-primary">
          {variant.name}
        </span>
      </nav>

      {/* Product Content */}
      <main className="px-5 lg:px-20 py-8 lg:py-12">
        <ProductDetailClient
          product={{
            id: variant.id,
            name: variant.name,
            category: variant.category.name,
            description:
              variant.product.description ??
              variant.product.shortDescription ??
              "",
            price,
            weightInfo,
            rating,
            reviewCount: variant.product.reviewCount,
            inStock: variant.stockQuantity > 0,
            images,
          }}
        />
      </main>
    </div>
  );
}
