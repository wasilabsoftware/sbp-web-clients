import { z } from "zod";

export const storefrontProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  basePrice: z.string(),
  salePrice: z.string().nullable(),
  images: z.array(z.string()).nullable(),
});

export const storefrontCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export const storefrontVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  weight: z.string().nullable(),
  packaging: z.string().nullable(),
  presentation: z.string().nullable(),
  stockQuantity: z.number(),
  sortOrder: z.number(),
  images: z.array(z.string()).nullable(),
  calculatedPrice: z.string().nullable(),
  product: storefrontProductSchema,
  category: storefrontCategorySchema,
});

export const storefrontPaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const storefrontResponseSchema = z.object({
  data: z.array(storefrontVariantSchema),
  pagination: storefrontPaginationSchema,
});

// Detail endpoint has extra product fields
export const storefrontProductDetailSchema = storefrontProductSchema.extend({
  description: z.string().nullable(),
  shortDescription: z.string().nullable(),
  averageRating: z.string().nullable(),
  reviewCount: z.number(),
});

export const storefrontVariantDetailSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  weight: z.string().nullable(),
  packaging: z.string().nullable(),
  presentation: z.string().nullable(),
  stockQuantity: z.number(),
  images: z.array(z.string()).nullable(),
  calculatedPrice: z.string().nullable(),
  product: storefrontProductDetailSchema,
  category: storefrontCategorySchema,
});

export const storefrontVariantDetailResponseSchema = z.object({
  data: storefrontVariantDetailSchema,
});

export type StorefrontVariant = z.infer<typeof storefrontVariantSchema>;
export type StorefrontVariantDetail = z.infer<typeof storefrontVariantDetailSchema>;
export type StorefrontProduct = z.infer<typeof storefrontProductSchema>;
export type StorefrontCategory = z.infer<typeof storefrontCategorySchema>;
export type StorefrontPagination = z.infer<typeof storefrontPaginationSchema>;
export type StorefrontResponse = z.infer<typeof storefrontResponseSchema>;
export type StorefrontVariantDetailResponse = z.infer<typeof storefrontVariantDetailResponseSchema>;

// Featured products endpoint returns product-level data with nested variants
export const featuredVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  weight: z.string().nullable(),
  packaging: z.string().nullable(),
  presentation: z.string().nullable(),
  stockQuantity: z.number(),
  sortOrder: z.number(),
  images: z.array(z.string()).nullable(),
  calculatedPrice: z.string().nullable(),
});

export const featuredProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  shortDescription: z.string().nullable(),
  basePrice: z.string(),
  salePrice: z.string().nullable(),
  averageRating: z.string().nullable(),
  reviewCount: z.number(),
  images: z.array(z.string()).nullable(),
  category: storefrontCategorySchema,
  variants: z.array(featuredVariantSchema),
});

export const featuredProductsResponseSchema = z.object({
  data: z.array(featuredProductSchema),
});

export type FeaturedProduct = z.infer<typeof featuredProductSchema>;
export type FeaturedProductsResponse = z.infer<typeof featuredProductsResponseSchema>;
