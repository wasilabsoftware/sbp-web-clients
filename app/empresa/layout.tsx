import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Soluciones para Empresas",
  description:
    "Programas de bienestar corporativo con snacks saludables, asesoría nutricional y pausas activas. Soluciones personalizadas para potenciar la productividad de tus colaboradores.",
  canonical: "/empresa",
  keywords: [
    "B2B",
    "bienestar corporativo",
    "snacks empresas",
    "frutas oficina",
    "bienestar laboral",
    "salud empresarial",
    "HORECA",
    "berries hoteles",
    "frutas restaurantes",
    "exportación berries",
    "berries mayorista",
    "Lima",
    "Perú",
  ],
});

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
