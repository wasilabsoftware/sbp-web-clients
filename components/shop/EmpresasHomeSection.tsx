import Link from "next/link";
import {
  Building2,
  ArrowRight,
  MessageCircle,
  Package,
  TrendingUp,
  Wrench,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const benefits = [
  {
    icon: Package,
    text: "Snacks saludables personalizados con tu marca",
  },
  {
    icon: TrendingUp,
    text: "Reduce el ausentismo y sube la motivación",
  },
  {
    icon: Wrench,
    text: "Programa llave en mano: nosotros gestionamos todo",
  },
  {
    icon: Users,
    text: "Desde 20 colaboradores. Sin contratos largos.",
  },
];

const trustedCompanies = [
  "NEXA",
  "SUNARP",
  "MEDIFARMA",
  "OSINERGMIN",
  "REFAX",
  "IMAGINA",
];

export function EmpresasHomeSection() {
  return (
    <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 lg:gap-12">
        {/* Header */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-5">
          <div className="inline-flex items-center gap-1.5 bg-berry-red-light rounded-full px-3 py-1.5">
            <Building2 className="w-3.5 h-3.5 text-berry-red" />
            <span className="text-xs font-semibold text-berry-red">
              Bienestar Corporativo
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-12 w-full">
            <div className="flex flex-col gap-3 lg:max-w-[560px]">
              <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center lg:text-left leading-tight">
                Tu equipo merece más que un snack ocasional
              </h2>
              <p className="text-[15px] lg:text-lg text-text-secondary text-center lg:text-left">
                Con nuestro programa{" "}
                <span className="font-semibold text-berry-red">
                  #ComeBerries #ComeSano
                </span>
                , tus colaboradores reciben bienestar real: snacks saludables con
                el branding de tu empresa, asesoría nutricional, pausas activas y
                coaching organizacional.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-3 lg:gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-berry-red-light flex items-center justify-center shrink-0">
                    <benefit.icon className="w-4.5 h-4.5 text-berry-red" />
                  </div>
                  <span className="text-sm lg:text-[15px] text-text-primary font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
          <Link href="/contacto?tipo=empresa" className="w-full lg:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full lg:w-auto h-[52px] lg:h-auto justify-center"
            >
              Agendar Reunión
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20programa%20de%20bienestar%20corporativo%20para%20mi%20empresa"
            target="_blank"
            className="w-full lg:w-auto"
          >
            <Button
              variant="whatsapp"
              size="md"
              className="w-full lg:w-auto h-[52px] lg:h-auto justify-center"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Cotizar por WhatsApp
            </Button>
          </Link>
        </div>

        {/* Trust Logos */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-border-subtle">
          <p className="text-xs lg:text-sm font-semibold text-text-tertiary uppercase tracking-wider">
            Empresas que ya confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center gap-5 lg:gap-10">
            {trustedCompanies.map((company) => (
              <span
                key={company}
                className="text-base lg:text-lg font-bold text-text-tertiary/50"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
