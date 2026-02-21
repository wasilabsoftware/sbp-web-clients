import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Sobre Super Berries Perú | Berries del Campo Peruano a Tu Mesa",
  description:
    "Conoce nuestra historia: +7,400 pedidos, 60+ productos naturales, 4 líneas de negocio. Atendemos familias, empresas, restaurantes y exportamos berries al mundo.",
  canonical: "/nosotros",
  keywords: [
    "sobre nosotros",
    "Super Berries Perú",
    "berries frescos Perú",
    "empresa berries Lima",
    "historia",
    "valores",
  ],
});

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
