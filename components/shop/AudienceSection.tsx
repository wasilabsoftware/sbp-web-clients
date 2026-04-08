import Link from "next/link";
import {
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

const audienceCards = [
  {
    icon: ShoppingBag,
    title: "Para tu día a día",
    description:
      "Berries frescos, congelados, frutos secos y súper snacks. Alimentación saludable directo a tu puerta.",
    href: "/tienda",
    cta: "Ver Tienda",
    iconColor: "text-berry-red",
    iconBg: "bg-berry-red-light",
  },
  {
    icon: Building2,
    title: "Para tu empresa",
    description:
      "Bienestar corporativo con snacks saludables, asesoría nutricional y programas para tus colaboradores.",
    href: "/empresa/comeberries-comesano",
    cta: "Ver Soluciones",
    iconColor: "text-berry-red",
    iconBg: "bg-berry-red-light",
  },
  {
    icon: UtensilsCrossed,
    title: "Para tu negocio (Horeca)",
    description:
      "Berries premium para hoteles, restaurantes, cafeterías, heladerías y catering en Lima.",
    href: "/horeca",
    cta: "Ver HORECA",
    iconColor: "text-berry-green",
    iconBg: "bg-berry-green-light",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
      <div className="flex flex-col items-center gap-6 lg:gap-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Encuentra lo que necesitas
          </h2>
          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[500px]">
            Berries y productos naturales para personas, empresas y negocios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {audienceCards.map((card) => (
            <div
              key={card.title}
              className="bg-bg-surface border border-border-subtle rounded-2xl p-5 lg:p-6 flex flex-col gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              <h3 className="text-lg lg:text-xl font-bold text-text-primary">
                {card.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                {card.description}
              </p>

              <Link href={card.href}>
                <button className="w-full flex items-center justify-center gap-2 bg-berry-red hover:bg-berry-red/90 text-text-inverse px-5 py-3.5 rounded-lg font-semibold text-sm transition-colors">
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
