import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
  UtensilsCrossed,
  Globe,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";

const channels = [
  {
    badge: "Bienestar Integral",
    badgeIcon: HeartPulse,
    badgeColor: "text-berry-red",
    badgeBg: "bg-berry-red-light",
    title: "#ComeBerries #ComeSano",
    descriptionMobile: "Snacks saludables, asesoría nutricional, pausas activas y coaching para tu equipo.",
    descriptionDesktop: "Programa integral de bienestar con snacks saludables, asesoría nutricional, pausas activas y coaching organizacional para tus colaboradores.",
    image: "https://imagedelivery.net/hrfM92Tw965illARz9WHuA/b7b00224-652e-4bf5-6e95-d64638501c00/Hero",
    imageAlt: "Programa ComeBerries de bienestar corporativo",
    href: "/b2b/comeberries-comesano",
    ctaText: "Ver Programa",
    ctaColor: "bg-berry-red hover:bg-berry-red/90",
    comingSoon: false,
  },
  {
    badge: "Canal HORECA",
    badgeIcon: UtensilsCrossed,
    badgeColor: "text-berry-green",
    badgeBg: "bg-berry-green-light",
    title: "Hoteles, Restaurantes y Catering",
    descriptionMobile: "Berries frescos y congelados para tu negocio gastronómico. Entrega programada en Lima.",
    descriptionDesktop: "Abastecimiento de berries frescos y congelados para hoteles, restaurantes, cafeterías y servicios de catering. Precios mayoristas y entrega programada en Lima.",
    image: "https://imagedelivery.net/hrfM92Tw965illARz9WHuA/c48d92c5-d761-472c-feec-774504b59400/Hero",
    imageAlt: "Berries para restaurantes y hoteles",
    href: "/b2b/horeca",
    ctaText: "Ver HORECA",
    ctaColor: "bg-berry-green hover:bg-berry-green/90",
    comingSoon: false,
  },
  {
    badge: "Export",
    badgeIcon: Globe,
    badgeColor: "text-amber-600",
    badgeBg: "bg-amber-50",
    title: "Premium Peruvian Berries for the World",
    descriptionMobile: "Fresh and frozen berries from Peru. Year-round supply, certified quality.",
    descriptionDesktop: "Export premium Peruvian berries to global markets. Blueberries, goldenberries, strawberries, and frozen IQF products. Year-round supply with certified quality.",
    image: "https://imagedelivery.net/hrfM92Tw965illARz9WHuA/a0c3b9f1-0f5d-4b4a-0b24-3d3ed092bb00/Hero",
    imageAlt: "Peruvian berries for export",
    href: "/b2b/exportacion",
    ctaText: "View Export",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
    comingSoon: false,
  },
];

const trustedCompanies = [
  "NEXA", "SUNARP", "MEDIFARMA", "OSINERGMIN", "REFAX", "IMAGINA",
];

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 pb-8 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-5 lg:gap-6">
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
            <Building2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-red" />
            <span className="text-xs lg:text-sm font-semibold text-berry-red">
              Canal Empresarial
            </span>
          </div>

          <h1 className="text-[28px] lg:text-5xl font-bold text-text-primary text-center max-w-[320px] lg:max-w-none">
            Soluciones B2B para tu empresa
          </h1>

          <p className="lg:hidden text-[15px] text-text-secondary text-center max-w-[320px]">
            Bienestar corporativo, abastecimiento HORECA y exportación de berries peruanos
          </p>

          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[700px]">
            Tres canales empresariales: bienestar corporativo, abastecimiento a hoteles y restaurantes, y exportación de berries peruanos premium al mundo
          </p>
        </div>
      </section>

      {/* Channels Section */}
      <section className="bg-bg-surface px-5 pb-10 lg:px-20 lg:pb-20">
        <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
            {channels.map((channel) => (
              <div
                key={channel.title}
                className={`bg-bg-surface border border-border-subtle rounded-2xl shadow-lg overflow-hidden flex flex-col ${
                  channel.comingSoon ? "opacity-60" : ""
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-[160px] lg:h-[180px]">
                  <Image
                    src={channel.image}
                    alt={channel.imageAlt}
                    fill
                    className={`object-cover ${channel.comingSoon ? "grayscale" : ""}`}
                  />
                  {channel.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="bg-white/90 text-text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                        Proximamente
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
                  <div className={`inline-flex items-center gap-1.5 ${channel.badgeBg} rounded-full px-2.5 py-1 w-fit`}>
                    <channel.badgeIcon className={`w-3 h-3 ${channel.badgeColor}`} />
                    <span className={`text-[11px] font-semibold ${channel.badgeColor}`}>
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-text-primary">
                    {channel.title}
                  </h3>

                  <p className="lg:hidden text-sm text-text-secondary flex-1">
                    {channel.descriptionMobile}
                  </p>
                  <p className="hidden lg:block text-sm text-text-secondary flex-1">
                    {channel.descriptionDesktop}
                  </p>

                  {channel.comingSoon ? (
                    <div className="mt-2">
                      <span className="w-full flex items-center justify-center gap-2 bg-bg-muted text-text-tertiary px-5 py-3.5 rounded-lg font-semibold text-sm cursor-not-allowed">
                        Proximamente
                      </span>
                    </div>
                  ) : (
                    <Link href={channel.href} className="mt-2">
                      <button className={`w-full flex items-center justify-center gap-2 ${channel.ctaColor} text-text-inverse px-5 py-3.5 rounded-lg font-semibold text-sm transition-colors`}>
                        {channel.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          <p className="text-sm lg:text-base font-semibold text-text-tertiary uppercase tracking-wider text-center">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {trustedCompanies.map((company) => (
              <span
                key={company}
                className="text-lg lg:text-xl font-bold text-text-tertiary/60"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-5 lg:gap-8">
          <h2 className="text-xl lg:text-[32px] font-bold text-text-primary text-center">
            ¿Necesitas una solución personalizada?
          </h2>

          <p className="lg:hidden text-sm text-text-secondary text-center">
            Creamos soluciones a medida. Contáctanos.
          </p>

          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[600px]">
            Creamos soluciones a medida para tu empresa. Contáctanos y diseñemos juntos la propuesta ideal.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
            <Link href="/contacto" className="w-full lg:w-auto">
              <Button variant="primary" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <Phone className="w-5 h-5" />
                Contactar Ventas
              </Button>
            </Link>
            <Link
              href="https://wa.me/51952805608"
              target="_blank"
              className="w-full lg:w-auto"
            >
              <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
