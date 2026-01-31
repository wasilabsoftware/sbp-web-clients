import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Super Berries Perú',
  shortName: 'SuperBerries',
  description: 'Descubre nuestra selección premium de fresas, arándanos, moras, aguaymanto y más. Berries frescos cultivados con amor en los valles del Perú.',
  url: 'https://superberriesperu.com',
  ogImage: '/og-image.png',
  locale: 'es_PE',
  themeColor: '#dc2626',
  keywords: [
    'berries',
    'fresas',
    'arándanos',
    'moras',
    'aguaymanto',
    'frambuesas',
    'cerezas',
    'frutos frescos',
    'delivery Lima',
    'Perú',
    'frutas premium',
    'snacks saludables',
  ],
  creator: 'Super Berries Perú',
  social: {
    instagram: 'https://instagram.com/superberriesperu',
    facebook: 'https://facebook.com/superberriesperu',
    whatsapp: '+51999999999',
  },
} as const;

export interface CreateMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  keywords?: string[];
}

/**
 * Creates metadata object with site defaults
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
  keywords,
}: CreateMetadataParams = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords || [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      title: title || siteConfig.name,
      description,
      url: canonical ? `${siteConfig.url}${canonical}` : siteConfig.url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description,
      images: [image.startsWith('http') ? image : `${siteConfig.url}${image}`],
    },
  };

  if (canonical) {
    metadata.alternates = {
      canonical,
    };
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return metadata;
}

/**
 * Creates product-specific metadata
 */
export function createProductMetadata({
  name,
  description,
  image,
  price,
  slug,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
}): Metadata {
  const title = `${name} | ${siteConfig.name}`;
  const productUrl = `/productos/${slug}`;

  return {
    title: name,
    description,
    keywords: [...siteConfig.keywords, name.toLowerCase()],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${productUrl}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}
