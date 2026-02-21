import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/seo/metadata";
import {
  UtensilsCrossed,
  Hotel,
  Coffee,
  GlassWater,
  IceCreamCone,
  ChefHat,
  Truck,
  CalendarCheck,
  Receipt,
  Snowflake,
  ShieldCheck,
  Package,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Berries al por Mayor para Restaurantes y Hoteles | Super Berries Perú",
  description:
    "Proveedor de arándanos, fresas, moras y berries congelados para hoteles, restaurantes y catering en Lima. Entrega programada. Precios mayoristas.",
  canonical: "/b2b/horeca",
  keywords: [
    "HORECA",
    "berries hoteles",
    "frutas restaurantes",
    "catering Lima",
    "berries al por mayor",
    "proveedor berries Lima",
    "fruta fresca hoteles Perú",
  ],
});

const targetAudience = [
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    description: "Garnishes, postres, ensaladas y decoración de platos con berries premium.",
  },
  {
    icon: Hotel,
    title: "Hoteles",
    description: "Buffets de desayuno, room service y amenities con frutas frescas de calidad.",
  },
  {
    icon: Coffee,
    title: "Cafeterías",
    description: "Toppings para açaí bowls, smoothies, pasteles y opciones saludables.",
  },
  {
    icon: GlassWater,
    title: "Bares de jugos",
    description: "Berries frescos y congelados para smoothies, jugos cold-pressed y batidos.",
  },
  {
    icon: IceCreamCone,
    title: "Heladerías",
    description: "Frutas frescas y congeladas para helados artesanales, toppings y salsas.",
  },
  {
    icon: ChefHat,
    title: "Catering",
    description: "Volúmenes flexibles para eventos corporativos, bodas y celebraciones.",
  },
];

const advantages = [
  {
    icon: Package,
    title: "Precios mayoristas",
    description: "Precios competitivos por volumen, sin pedido mínimo en Lima.",
  },
  {
    icon: CalendarCheck,
    title: "Entrega programada",
    description: "Frecuencia diaria o semanal según tu necesidad. Siempre puntual.",
  },
  {
    icon: Receipt,
    title: "Facturación empresarial",
    description: "Factura electrónica, guías de remisión y todo en orden para tu negocio.",
  },
  {
    icon: ShieldCheck,
    title: "Calibre uniforme",
    description: "Producto seleccionado y calibrado para presentación consistente.",
  },
  {
    icon: Snowflake,
    title: "Cadena de frío",
    description: "Transporte refrigerado que garantiza la frescura de cada entrega.",
  },
  {
    icon: Truck,
    title: "Delivery directo",
    description: "Entregamos directamente en tu local en Lima Metropolitana.",
  },
];

const catalogItems = [
  { name: "Berries frescos", items: "Arándanos, fresas, moras, frambuesas, aguaymanto, cerezas" },
  { name: "Congelados", items: "Berries IQF ideales para smoothies, postres, salsas y helados" },
  { name: "Frutas de temporada", items: "Pitahaya, lúcuma, granadilla y frutas exóticas peruanas" },
  { name: "Frutos secos", items: "Almendras, pistachos, nueces y mix para decoración y toppings" },
];

export default function HorecaPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Empresas", url: "/b2b" },
          { name: "HORECA" },
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-15">
          <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-6 flex-1">
            <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-green-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
              <UtensilsCrossed className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-green" />
              <span className="text-xs lg:text-sm font-semibold text-berry-green">
                Canal HORECA
              </span>
            </div>

            <h1 className="text-[28px] lg:text-[48px] font-bold text-text-primary leading-tight text-center lg:text-left">
              Berries frescos y congelados para tu negocio gastronómico
            </h1>

            <p className="text-[15px] lg:text-lg text-text-secondary text-center lg:text-left max-w-[500px]">
              Proveedor de berries premium para hoteles, restaurantes, cafeterías, bares de jugos, heladerías y servicios de catering en Lima.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto mt-2">
              <Link href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20abastecimiento%20HORECA" target="_blank" className="w-full lg:w-auto">
                <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                  <MessageCircle className="w-5 h-5" />
                  Cotizar por WhatsApp
                </Button>
              </Link>
              <Link href="/contacto?tipo=horeca" className="w-full lg:w-auto">
                <Button variant="outline" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                  Llenar formulario
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full lg:w-[480px] h-[250px] lg:h-[380px] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
              alt="Berries frescos para restaurantes y hoteles"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              ¿Para quién es?
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[500px]">
              Frescura garantizada, volúmenes flexibles, entrega programada
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-[1000px]">
            {targetAudience.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center lg:items-start gap-3 p-5 lg:p-6 bg-bg-surface rounded-xl border border-border-subtle text-center lg:text-left"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-berry-green-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-berry-green" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Preview */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[900px] mx-auto">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Catálogo HORECA
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
            {catalogItems.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col gap-2 p-5 lg:p-6 bg-bg-surface rounded-xl border border-border-subtle"
              >
                <h3 className="text-base lg:text-lg font-bold text-text-primary">
                  {cat.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cat.items}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-tertiary text-center">
            Precios por kilo disponibles bajo cotización. Contáctanos para tu lista personalizada.
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Ventajas para tu negocio
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-[1000px]">
            {advantages.map((adv) => (
              <div key={adv.title} className="flex flex-col gap-2 lg:gap-3">
                <div className="w-10 h-10 rounded-xl bg-berry-red-light flex items-center justify-center">
                  <adv.icon className="w-5 h-5 text-berry-red" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-text-primary">
                  {adv.title}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-5 lg:gap-6 max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-inverse">
            ¿Necesitas berries para tu negocio?
          </h2>
          <p className="text-[15px] lg:text-lg text-white/80">
            Cotízanos por WhatsApp o llena el formulario. Respondemos en menos de 1 hora.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            <Link href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20abastecimiento%20HORECA" target="_blank" className="w-full lg:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <MessageCircle className="w-5 h-5" />
                Cotizar por WhatsApp
              </Button>
            </Link>
            <Link href="tel:+51952805608" className="w-full lg:w-auto">
              <Button variant="secondary" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <Phone className="w-5 h-5" />
                Llamar ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
