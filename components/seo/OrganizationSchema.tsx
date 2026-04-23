import { siteConfig } from "@/lib/seo/metadata";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: "https://imagedelivery.net/hrfM92Tw965illARz9WHuA/45c88eec-3e75-49f6-9976-6cea56a51f00/Hero",
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.social.whatsapp,
      contactType: "sales",
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PE",
      addressLocality: "Lima",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
