import {
  storefrontResponseSchema,
  storefrontVariantDetailResponseSchema,
  type StorefrontResponse,
  type StorefrontVariantDetail,
} from "@/types/storefront";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

export interface StorefrontParams {
  page?: number;
  limit?: number;
  category?: number;
  search?: string;
  inStock?: boolean;
}

export async function getStorefrontVariants(
  params: StorefrontParams = {}
): Promise<StorefrontResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 12));

  if (params.category) {
    searchParams.set("category", String(params.category));
  }
  if (params.search) {
    searchParams.set("search", params.search);
  }
  if (params.inStock !== undefined) {
    searchParams.set("inStock", String(params.inStock));
  }

  const res = await fetch(
    `${getApiUrl()}/api/v1/storefront/variants?${searchParams.toString()}`,
    {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.status}`);
  }

  const data = await res.json();
  return storefrontResponseSchema.parse(data);
}

export async function getStorefrontVariantById(
  id: string
): Promise<StorefrontVariantDetail> {
  const res = await fetch(
    `${getApiUrl()}/api/v1/storefront/variants/${id}`,
    {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Error al obtener variante: ${res.status}`);
  }

  const data = await res.json();
  return storefrontVariantDetailResponseSchema.parse(data).data;
}
