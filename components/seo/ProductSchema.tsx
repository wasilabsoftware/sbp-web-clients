import { siteConfig } from "@/lib/seo/metadata";

interface WeightOption {
  label: string;
  price: number;
  unit: string;
}

interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    images: string[];
    weights: WeightOption[];
    slug: string;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const offers = product.weights.map((weight) => ({
    "@type": "Offer" as const,
    name: weight.label,
    url: `${siteConfig.url}/productos/${product.slug}`,
    priceCurrency: "PEN",
    price: weight.price,
    availability: product.inStock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    seller: {
      "@type": "Organization" as const,
      name: siteConfig.name,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers:
      offers.length === 1
        ? offers[0]
        : {
            "@type": "AggregateOffer",
            lowPrice: Math.min(...product.weights.map((w) => w.price)),
            highPrice: Math.max(...product.weights.map((w) => w.price)),
            priceCurrency: "PEN",
            offerCount: offers.length,
            offers,
          },
    ...(product.rating && product.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
