import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contacto | Pide Berries Frescos en Lima | Super Berries Perú",
  description:
    "Contáctanos por WhatsApp (+51 952 805 608) o formulario. Delivery el mismo día en Lima. Familias, empresas, HORECA y exportación.",
  canonical: "/contacto",
  keywords: [
    "contacto Super Berries Perú",
    "pedir berries Lima",
    "delivery frutas frescas Lima",
    "WhatsApp berries",
  ],
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
