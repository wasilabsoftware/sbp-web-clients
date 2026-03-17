import { z } from "zod";

export const apiCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  categoryType: z.string(),
  parentId: z.number().nullable(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string(),
  defaultMarginPercentage: z.string(),
});

export const apiCategoriesResponseSchema = z.array(apiCategorySchema);

export type ApiCategory = z.infer<typeof apiCategorySchema>;
