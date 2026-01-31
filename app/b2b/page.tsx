import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
  ArrowRight,
  Timer,
  Bell,
  Phone,
  MessageCircle,
  Apple,
  Salad,
  Activity,
  Brain,
  LucideIcon,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";

const programFeatures: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "Snacks", icon: Apple, color: "text-berry-red" },
  { label: "Nutrición", icon: Salad, color: "text-berry-green" },
  { label: "Activo", icon: Activity, color: "text-[#F5A623]" },
  { label: "Coaching", icon: Brain, color: "text-berry-purple" },
];

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 pb-8 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-5 lg:gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
            <Building2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-red" />
            <span className="text-xs lg:text-sm font-semibold text-berry-red">
              Canal Empresarial
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[28px] lg:text-5xl font-bold text-text-primary text-center max-w-[320px] lg:max-w-none">
            Soluciones B2B para tu empresa
          </h1>

          {/* Description - Mobile */}
          <p className="lg:hidden text-[15px] text-text-secondary text-center max-w-[320px]">
            Programas de bienestar corporativo para potenciar a tus colaboradores
          </p>

          {/* Description - Desktop */}
          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[700px]">
            Descubre nuestros programas de bienestar corporativo diseñados para
            potenciar la productividad y felicidad de tus colaboradores
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-bg-surface px-5 pb-10 lg:px-20 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-5 lg:gap-8">
          {/* Program 1 - Active */}
          <div className="w-full lg:w-[400px] bg-bg-surface border border-border-subtle rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-[160px] lg:h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1663136618561-29fcf597c51a?w=800"
                alt="Berries frescos"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 lg:p-8 flex flex-col gap-3 lg:gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-berry-red-light rounded-full px-2.5 py-1 lg:px-3 lg:py-1.5 w-fit">
                <HeartPulse className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-berry-red" />
                <span className="text-[11px] lg:text-xs font-semibold text-berry-red">
                  Bienestar Integral
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-text-primary">
                #ComeBerries #ComeSano
              </h3>

              {/* Description - Mobile */}
              <p className="lg:hidden text-sm text-text-secondary">
                Snacks saludables, asesoría nutricional, pausas activas y coaching organizacional.
              </p>

              {/* Description - Desktop */}
              <p className="hidden lg:block text-[15px] text-text-secondary">
                Programa integral de bienestar con snacks saludables, asesoría
                nutricional, pausas activas y coaching organizacional.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {programFeatures.map((feature, index) => (
                  <div
                    key={feature.label}
                    className={`flex items-center gap-1 lg:gap-1.5 ${index === 3 ? "hidden lg:flex" : ""}`}
                  >
                    <feature.icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 ${feature.color}`} />
                    <span className="text-xs lg:text-[13px] text-text-tertiary font-medium">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/b2b/comeberries-comesano" className="mt-1 lg:mt-2">
                <button className="w-full flex items-center justify-center gap-2 bg-berry-red text-text-inverse px-5 py-3.5 lg:px-6 lg:py-4 rounded-lg font-semibold text-sm lg:text-[15px] hover:bg-berry-red/90 transition-colors">
                  Ver Programa
                  <ArrowRight className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Program 2 - Coming Soon */}
          <div className="w-full lg:w-[400px] bg-bg-surface border border-border-subtle rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden flex flex-col">
            {/* Placeholder Image */}
            <div className="w-full h-[120px] lg:h-[200px] bg-bg-muted flex items-center justify-center">
              <div className="w-9 h-9 lg:w-12 lg:h-12 text-text-tertiary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 lg:p-8 flex flex-col gap-3 lg:gap-4 flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-bg-muted rounded-full px-2.5 py-1 lg:px-3 lg:py-1.5 w-fit">
                <Timer className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-text-tertiary" />
                <span className="text-[11px] lg:text-xs font-semibold text-text-tertiary">
                  Próximamente
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-text-tertiary">
                Nuevo programa
              </h3>

              {/* Description - Mobile */}
              <p className="lg:hidden text-sm text-text-tertiary">
                Estamos preparando nuevas soluciones. ¡Mantente atento!
              </p>

              {/* Description - Desktop */}
              <p className="hidden lg:block text-[15px] text-text-tertiary">
                Estamos preparando nuevas soluciones de bienestar corporativo.
                ¡Mantente atento!
              </p>

              {/* Notify Button */}
              <button className="mt-auto w-full flex items-center justify-center gap-2 px-5 py-3.5 lg:px-6 lg:py-4 border-2 border-border-subtle rounded-lg text-text-tertiary font-semibold text-sm lg:text-[15px] hover:border-text-tertiary transition-colors">
                Notificarme
                <Bell className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-5 lg:gap-8">
          {/* Title */}
          <h2 className="text-xl lg:text-[32px] font-bold text-text-primary text-center">
            ¿No encuentras lo que buscas?
          </h2>

          {/* Description - Mobile */}
          <p className="lg:hidden text-sm text-text-secondary text-center">
            Creamos soluciones a medida. Contáctanos.
          </p>

          {/* Description - Desktop */}
          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[600px]">
            Creamos soluciones a medida para tu empresa. Contáctanos y diseñemos
            juntos el programa ideal.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
            <Link href="#" className="w-full lg:w-auto">
              <button className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-berry-red text-text-inverse px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:bg-berry-red/90 transition-colors">
                <Phone className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                Contactar Ventas
              </button>
            </Link>
            <Link
              href="https://wa.me/51999888777"
              target="_blank"
              className="w-full lg:w-auto"
            >
              <button className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-whatsapp text-text-inverse px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                WhatsApp
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
