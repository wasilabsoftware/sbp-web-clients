import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
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
    href: "/empresa/comeberries-comesano",
    ctaText: "Ver Programa",
    ctaColor: "bg-berry-red hover:bg-berry-red/90",
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
    href: "/empresa/exportacion",
    ctaText: "View Export",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
    comingSoon: false,
  },
];

const trustedCompanies = [
  "NEXA", "SUNARP", "MEDIFARMA", "OSINERGMIN", "REFAX", "IMAGINA",
];

const empresaStats = [
  { value: "+7,400", label: "Pedidos entregados" },
  { value: "6+", label: "Empresas activas" },
  { value: "4", label: "Pilares de bienestar" },
  { value: "20+", label: "Colaboradores mínimo" },
];

const processStepsEmpresa = [
  { step: "1", title: "Reunión de diagnóstico", description: "Entendemos las necesidades de tu equipo y tu cultura organizacional." },
  { step: "2", title: "Propuesta personalizada", description: "Diseñamos el programa ideal: snacks, frecuencia, branding y activaciones." },
  { step: "3", title: "Implementación", description: "Arrancamos en 5 días hábiles. Nosotros gestionamos todo." },
  { step: "4", title: "Seguimiento mensual", description: "Medimos impacto, ajustamos y mejoramos continuamente." },
];

export default function EmpresaPage() {
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
            Bienestar corporativo que se nota, se come y se mide
          </h1>

          <p className="lg:hidden text-[15px] text-text-secondary text-center max-w-[320px]">
            Programas integrales de bienestar y exportación de berries premium para empresas.
          </p>

          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[700px]">
            Programas integrales de bienestar corporativo y exportación de berries peruanos premium. Snacks saludables, asesoría nutricional y experiencias que transforman tu cultura organizacional.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto mt-2">
            <Link href="/contacto?tipo=empresa" className="w-full lg:w-auto">
              <Button variant="primary" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                Agendar Reunión
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20programa%20de%20bienestar%20corporativo" target="_blank" className="w-full lg:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <MessageCircle className="w-5 h-5" />
                Cotizar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-berry-red px-5 py-8 lg:px-20 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1000px] mx-auto">
          {empresaStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-[28px] lg:text-[40px] font-bold text-text-inverse">
                {stat.value}
              </span>
              <span className="text-xs lg:text-sm text-white/80 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Channels Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Nuestros canales empresariales
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
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

      {/* Cómo Funciona Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              Cómo implementamos ComeBerries en tu empresa
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[500px]">
              En 4 pasos simples, tu equipo empieza a disfrutar de bienestar real
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {processStepsEmpresa.map((step) => (
              <div key={step.step} className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-berry-red-light flex items-center justify-center relative">
                  <span className="text-xl font-bold text-berry-red">{step.step}</span>
                </div>
                <h3 className="text-sm lg:text-base font-bold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
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
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-5 lg:gap-6 max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-inverse">
            Agenda una reunión y diseña el programa ideal para tu equipo
          </h2>

          <p className="text-[15px] lg:text-lg text-white/80">
            En 15 minutos te mostramos cómo funciona y preparamos una propuesta personalizada.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            <Link href="/contacto?tipo=empresa" className="w-full lg:w-auto">
              <Button variant="outline" size="lg" className="w-full lg:w-auto h-[52px] justify-center border-white text-white hover:bg-white hover:text-berry-red">
                Agendar Reunión
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link
              href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20programa%20de%20bienestar%20corporativo"
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
