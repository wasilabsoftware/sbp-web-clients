import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Pido cada semana y siempre llegan fresquísimos. La diferencia con el supermercado es enorme.",
    author: "Ana M.",
    context: "Cliente frecuente, Miraflores",
    type: "B2C" as const,
  },
  {
    text: "Implementamos ComeBerries para 80 colaboradores. El feedback fue inmediato: se sienten cuidados y motivados.",
    author: "Carlos R.",
    context: "Jefe de RRHH",
    type: "B2B" as const,
  },
  {
    text: "Necesitábamos un proveedor confiable de berries para nuestros postres. La calidad y puntualidad son impecables.",
    author: "Chef Diego L.",
    context: "Restaurante en Lima",
    type: "HORECA" as const,
  },
];

const stats = [
  { value: "+7,400", label: "pedidos entregados" },
  { value: "60+", label: "productos naturales" },
  { value: "6+", label: "empresas confían" },
  { value: "7", label: "años de experiencia" },
];

export function SocialProofSection() {
  return (
    <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 lg:gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Más de 7,400 pedidos nos respaldan
          </h2>
          <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[500px]">
            Lo que dicen quienes ya confían en nosotros
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-bg-surface border border-border-subtle rounded-2xl p-5 lg:p-6 flex flex-col gap-4"
            >
              <Quote className="w-6 h-6 text-berry-red/30" />

              <p className="text-[15px] lg:text-base text-text-primary leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
                <div className="w-9 h-9 rounded-full bg-berry-red-light flex items-center justify-center">
                  <span className="text-sm font-bold text-berry-red">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {testimonial.context}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-bg-surface border border-border-subtle rounded-xl p-4 lg:p-6"
            >
              <span className="text-2xl lg:text-3xl font-bold text-berry-red">
                {stat.value}
              </span>
              <span className="text-xs lg:text-sm text-text-secondary text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
