import { CatalogClient } from "@/components/shop/CatalogClient";
import { getCategories } from "@/lib/services/category.service";
import {
  getStorefrontBundles,
  getStorefrontVariants,
} from "@/lib/services/storefront.service";
import { getAllCategories } from "@/lib/data/products";
import type { ApiCategory } from "@/types/category";

// Categories that hold packs (bundles) instead of products.
const BUNDLE_CATEGORY_SLUGS = ["super-packs", "super-snacks"];

interface CatalogPageProps {
  searchParams: Promise<{
    categoria?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { categoria, search, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  // Fetch categories
  let categories: { id: string; name: string }[];
  let apiCategories: ApiCategory[] = [];

  try {
    apiCategories = await getCategories();
    const topLevel = apiCategories.filter((c) => c.parentId === null);
    categories = [
      { id: "todos", name: "Todos" },
      ...topLevel.map((c) => ({ id: c.slug, name: c.name })),
    ];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories = getAllCategories();
  }

  // Resolve category slug → numeric ID for API call
  const selectedCategory = categoria ?? "todos";
  let categoryId: number | undefined;

  if (selectedCategory !== "todos" && apiCategories.length > 0) {
    const found = apiCategories.find((c) => c.slug === selectedCategory);
    if (found) categoryId = found.id;
  }

  // Fetch products from API
  let products: {
    id: string;
    name: string;
    category: string;
    weight: string;
    price: number;
    imageUrl: string | null;
    href: string;
  }[] = [];
  let totalPages = 1;
  let totalProducts = 0;

  try {
    const response = await getStorefrontVariants({
      page: currentPage,
      limit: 12,
      category: categoryId,
      search: search || undefined,
      // inStock: true, // Deshabilitado: solo 14 de 160 productos tienen stock
    });

    products = response.data.map((variant) => {
      const image =
        variant.images?.[0] ??
        variant.product.images?.[0] ??
        null;
      const price = variant.calculatedPrice
        ? parseFloat(variant.calculatedPrice)
        : parseFloat(variant.product.basePrice);

      return {
        id: variant.id,
        name: variant.name.replace(/\s*c\/\s*taper/gi, ""),
        category: variant.category.name,
        weight: [variant.weight ? `${variant.weight}g` : null, variant.packaging, variant.presentation]
          .filter(Boolean)
          .join(" · "),
        price,
        imageUrl: image,
        href: `/tienda/${variant.product.slug}?v=${variant.id}`,
      };
    });

    totalPages = response.pagination.totalPages;
    totalProducts = response.pagination.total;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Packs (bundles): shown as their own section. When a bundle category is
  // selected they replace the product grid (those categories hold no
  // sellable products); on "Todos" a teaser of the packs appears on page 1.
  const isBundleCategory = BUNDLE_CATEGORY_SLUGS.includes(selectedCategory);
  let bundles: {
    id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string | null;
  }[] = [];

  if (!search && (isBundleCategory || (selectedCategory === "todos" && currentPage === 1))) {
    try {
      const allBundles = await getStorefrontBundles();
      const filtered = isBundleCategory
        ? allBundles.filter((b) => b.category?.slug === selectedCategory)
        : allBundles.slice(0, 6);

      bundles = filtered.map((b) => ({
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category?.name ?? "Pack",
        description:
          b.description ?? b.components.map((comp) => comp.name).join(", "),
        price: parseFloat(b.calculatedPrice),
        imageUrl: b.images?.[0] ?? null,
      }));
    } catch (error) {
      console.error("Failed to fetch bundles:", error);
    }
  }

  return (
    <CatalogClient
      categories={categories}
      products={products}
      bundles={bundles}
      bundlesOnly={isBundleCategory}
      currentPage={currentPage}
      totalPages={totalPages}
      totalProducts={totalProducts}
      selectedCategory={selectedCategory}
      searchQuery={search ?? ""}
    />
  );
}
