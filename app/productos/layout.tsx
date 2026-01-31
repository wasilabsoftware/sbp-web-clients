import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Catálogo de Berries Frescos",
  description:
    "Explora nuestra selección de fresas, arándanos, moras, aguaymanto y más berries frescos con delivery en Lima. Productos premium cultivados en los valles del Perú.",
  canonical: "/productos",
  keywords: [
    "berries frescos",
    "fresas",
    "arándanos",
    "moras",
    "aguaymanto",
    "frambuesas",
    "delivery Lima",
    "frutas frescas Perú",
    "comprar berries online",
  ],
});

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
