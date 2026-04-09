import Link from "next/link";
import {
  UtensilsCrossed,
  ArrowRight,
  MessageCircle,
  CalendarClock,
  Ruler,
  BadgePercent,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const highlights = [
  {
    icon: CalendarClock,
    text: "Entrega programada: diaria o semanal, tú eliges",
  },
  {
    icon: Ruler,
    text: "Calibre uniforme para presentación de platos",
  },
  {
    icon: BadgePercent,
    text: "Precios mayoristas sin pedido mínimo en Lima",
  },
];

export function HorecaHomeSection() {
  return (
    <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
        {/* Content */}
        <div className="flex flex-col gap-5 lg:gap-6 flex-1">
          <div className="inline-flex items-center gap-1.5 bg-berry-green-light rounded-full px-3 py-1.5 w-fit">
            <UtensilsCrossed className="w-3.5 h-3.5 text-berry-green" />
            <span className="text-xs font-semibold text-berry-green">
              Canal HORECA
            </span>
          </div>

          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary leading-tight">
            Berries frescos para tu cocina profesional
          </h2>

          <p className="text-[15px] lg:text-lg text-text-secondary">
            Abastecimiento programado de berries premium para restaurantes,
            hoteles, cafeterías, heladerías y catering en Lima. Calibre
            uniforme, cadena de frío, y entregas puntuales para que tu operación
            nunca pare.
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-3">
            {highlights.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-berry-green-light flex items-center justify-center shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-berry-green" />
                </div>
                <span className="text-sm lg:text-[15px] text-text-primary font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto mt-2">
            <Link
              href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20abastecimiento%20HORECA%20de%20berries"
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
            <Link href="/horeca" className="w-full lg:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full lg:w-auto h-[52px] lg:h-auto justify-center"
              >
                Ver catálogo HORECA
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual - Stats card */}
        <div className="hidden lg:flex flex-col gap-5 bg-bg-surface border border-border-subtle rounded-2xl p-8 w-[380px] shrink-0">
          <h3 className="text-lg font-bold text-text-primary">
            Ideal para tu negocio
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Restaurantes", icon: "🍽️" },
              { label: "Hoteles", icon: "🏨" },
              { label: "Cafeterías", icon: "☕" },
              { label: "Heladerías", icon: "🍨" },
              { label: "Juguerías", icon: "🥤" },
              { label: "Catering", icon: "🎉" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 bg-bg-muted rounded-lg px-3 py-2.5"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium text-text-primary">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
