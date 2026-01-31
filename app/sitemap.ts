import type { MetadataRoute } from 'next';

// TODO: Replace with database query when products are dynamic
const staticProducts = [
  { slug: 'fresas-premium', updatedAt: new Date() },
  { slug: 'arandanos-frescos', updatedAt: new Date() },
  { slug: 'moras-silvestres', updatedAt: new Date() },
  { slug: 'aguaymanto', updatedAt: new Date() },
  { slug: 'cerezas', updatedAt: new Date() },
  { slug: 'pistachos', updatedAt: new Date() },
  { slug: 'frambuesas', updatedAt: new Date() },
  { slug: 'almendras', updatedAt: new Date() },
  { slug: 'arandanos-deshidratados', updatedAt: new Date() },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://superberriesperu.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/b2b`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/b2b/comeberries-comesano`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/registro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Product pages
  // TODO: Fetch from database: const products = await getProducts();
  const productPages: MetadataRoute.Sitemap = staticProducts.map((product) => ({
    url: `${baseUrl}/productos/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
