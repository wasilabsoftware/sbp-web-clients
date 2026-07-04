import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { BundleDetailClient } from "@/components/shop/BundleDetailClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { createProductMetadata } from "@/lib/seo/metadata";
import { getStorefrontBundles } from "@/lib/services/storefront.service";
import type { StorefrontBundle } from "@/types/storefront";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// The public bundles list is small (~25) and cached; resolving the slug
// against it avoids a dedicated detail endpoint.
async function getBundleBySlug(slug: string): Promise<StorefrontBundle | null> {
  try {
    const bundles = await getStorefrontBundles();
    return bundles.find((b) => b.slug === slug) ?? null;
  } catch {
    return null;
  }
}

function bundleDescription(bundle: StorefrontBundle): string {
  return (
    bundle.description ??
    bundle.components.map((component) => component.name).join(", ")
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await getBundleBySlug(slug);

  if (!bundle) {
    return { title: "Pack no encontrado" };
  }

  return createProductMetadata({
    name: bundle.name,
    description: bundleDescription(bundle),
    image: bundle.images?.[0] ?? "",
    price: parseFloat(bundle.calculatedPrice),
    slug: `packs/${slug}`,
  });
}

export default async function BundleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = await getBundleBySlug(slug);

  if (!bundle) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Inicio", url: "/" },
    { name: "Tienda", url: "/tienda" },
    { name: bundle.name },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
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
          {bundle.name}
        </span>
      </nav>

      {/* Bundle Content */}
      <main className="px-5 lg:px-20 py-8 lg:py-12">
        <BundleDetailClient
          bundle={{
            id: bundle.id,
            name: bundle.name,
            category: bundle.category?.name ?? "Pack",
            description: bundleDescription(bundle),
            price: parseFloat(bundle.calculatedPrice),
            images: bundle.images ?? [],
            components: bundle.components,
          }}
        />
      </main>
    </div>
  );
}
