import { siteConfig } from "@/lib/seo/metadata";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  slug,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt,
    url: `${siteConfig.url}/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
