import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Blog | Super Berries Perú",
  description:
    "Recetas con berries, tips de nutrición, guías de conservación y novedades del mundo de las frutas frescas. Aprende a vivir más saludable.",
  canonical: "/blog",
  keywords: [
    "blog berries",
    "recetas berries",
    "nutrición frutas",
    "tips conservación berries",
    "smoothie bowls recetas",
    "beneficios arándanos",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
