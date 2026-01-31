import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Soluciones B2B para Empresas",
  description:
    "Programas de bienestar corporativo con snacks saludables, asesoría nutricional y pausas activas. Soluciones personalizadas para potenciar la productividad de tus colaboradores.",
  canonical: "/b2b",
  keywords: [
    "B2B",
    "bienestar corporativo",
    "snacks empresas",
    "frutas oficina",
    "bienestar laboral",
    "salud empresarial",
    "Lima",
    "Perú",
  ],
});

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
