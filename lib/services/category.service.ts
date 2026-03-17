import { unstable_cache } from "next/cache";
import {
  apiCategoriesResponseSchema,
  type ApiCategory,
} from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

// Mapping temporal: API slug → hardcoded categoryId de productos
// Eliminar cuando los productos vengan de la API
const SLUG_TO_PRODUCT_CATEGORY_ID: Record<string, string> = {
  "berries-frescos": "berries",
  "berries-congelados": "congelados",
  "frutos-secos": "frutos-secos",
  "super-snacks": "super-snacks",
  "frutas-deshidratadas": "deshidratados",
  "super-frutas-frescas": "frutas",
};

// Imágenes fallback cuando la API no tiene imageUrl
const FALLBACK_IMAGES: Record<string, string> = {
  "berries-frescos":
    "https://images.unsplash.com/photo-1636119708793-7af9f143ac13?w=400",
  "berries-congelados":
    "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=400",
  "frutos-secos":
    "https://images.unsplash.com/photo-1724058663142-e6e1a5e89f2d?w=400",
  "super-snacks":
    "https://images.unsplash.com/photo-1583440772344-edd2e043742c?w=400",
  "frutas-deshidratadas":
    "https://images.unsplash.com/photo-1748898297482-3c336a18cca5?w=400",
  "super-frutas-frescas":
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400",
};

async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${getApiUrl()}/api/v1/categories`, {
    headers: { accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Error al obtener categorías");
  }

  const data = await res.json();
  return apiCategoriesResponseSchema.parse(data);
}

export const getCategories = unstable_cache(fetchCategories, ["categories"], {
  revalidate: 300,
  tags: ["categories"],
});

export function getCategoryFilterId(slug: string): string {
  return SLUG_TO_PRODUCT_CATEGORY_ID[slug] ?? slug;
}

export function getCategoryFallbackImage(slug: string): string | undefined {
  return FALLBACK_IMAGES[slug];
}
