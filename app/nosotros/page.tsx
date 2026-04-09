import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Leaf,
  ShieldCheck,
  Users,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  Globe,
  ArrowRight,
  MessageCircle,
  Truck,
  Search,
  Package,
  CheckCircle,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: "+7,400", label: "Pedidos entregados" },
  { value: "60+", label: "Productos naturales" },
  { value: "6+", label: "Empresas confían en nosotros" },
  { value: "4", label: "Canales de distribución" },
];

const channels = [
  {
    icon: ShoppingBag,
    title: "E-commerce (B2C)",
    description: "Delivery el mismo día en Lima para familias, deportistas y amantes de lo saludable.",
    href: "/tienda",
    color: "text-berry-red",
    bgColor: "bg-berry-red-light",
  },
  {
    icon: Building2,
    title: "Corporativo (B2B)",
    description: "Programa #ComeBerries para bienestar de colaboradores. NEXA, SUNARP, MEDIFARMA ya confían.",
    href: "/empresa/comeberries-comesano",
    color: "text-berry-purple",
    bgColor: "bg-purple-50",
  },
  {
    icon: UtensilsCrossed,
    title: "HORECA",
    description: "Abastecimiento de berries frescos y congelados para hoteles, restaurantes y catering.",
    href: "/horeca",
    color: "text-berry-green",
    bgColor: "bg-berry-green-light",
  },
  {
    icon: Globe,
    title: "Exportación",
    description: "Berries peruanos premium para el mundo. Arándanos, aguaymanto y más.",
    href: "/empresa/exportacion",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Selección en campo",
    description: "Trabajamos con los mejores productores de los valles del Perú.",
  },
  {
    icon: ShieldCheck,
    title: "Control de calidad",
    description: "Cada producto pasa por una revisión rigurosa de frescura y calibre.",
  },
  {
    icon: Package,
    title: "Empaque fresco",
    description: "Empacado con cadena de frío para preservar sabor y nutrientes.",
  },
  {
    icon: Truck,
    title: "Delivery el mismo día",
    description: "Entregamos en tu puerta en Lima Metropolitana el mismo día.",
  },
];

const trustedCompanies = [
  "NEXA", "SUNARP", "MEDIFARMA", "OSINERGMIN", "REFAX", "IMAGINA",
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
            <Heart className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-red" />
            <span className="text-xs lg:text-sm font-semibold text-berry-red">
              Nuestra Historia
            </span>
          </div>
          <h1 className="text-[32px] lg:text-[56px] font-bold text-text-primary leading-tight text-center">
            Life&apos;s Better
            <br />
            with Berries 🍓
          </h1>
          <p className="text-[15px] lg:text-lg text-text-secondary text-center max-w-[600px]">
            Somos Súper Berries Perú. Llevamos lo mejor del campo peruano a tu mesa, a tu empresa y al mundo.
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-15 max-w-[1100px] mx-auto">
          <div className="relative w-full lg:w-[400px] h-[250px] lg:h-[350px] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/a9205b0b-4f68-447d-8d11-0b048108ea00/Hero"
              alt="Campos de berries en Perú"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center lg:text-left">
              Nuestra Historia
            </h2>
            <p className="text-[15px] lg:text-lg text-text-secondary leading-relaxed text-center lg:text-left">
              Nacimos con una misión simple: que más peruanos disfruten de berries frescos y de calidad sin salir de casa.
            </p>
            <p className="text-[15px] lg:text-lg text-text-secondary leading-relaxed text-center lg:text-left">
              Lo que empezó con entregas por WhatsApp en Lima, hoy es una empresa con más de 7,400 pedidos entregados, 60+ productos naturales, y 4 líneas de negocio que atienden desde familias hasta empresas como NEXA, SUNARP y MEDIFARMA.
            </p>
            {/* Founder Quote */}
            <div className="bg-bg-surface border-l-4 border-berry-red rounded-r-xl p-5 lg:p-6 mt-2">
              <p className="text-[15px] lg:text-base text-text-primary italic leading-relaxed">
                &ldquo;Empecé vendiendo berries por WhatsApp desde mi casa en 2017. Hoy atendemos a más de 6 empresas y hemos entregado más de 7,400 pedidos. Lo que no ha cambiado es la obsesión por la frescura.&rdquo;
              </p>
              <p className="text-sm font-semibold text-berry-red mt-3">
                — Javier Guerra, Fundador
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-8 lg:gap-10 max-w-[900px] mx-auto">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-primary text-center">
            Nuestro camino
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
            {[
              { year: "2017", title: "Fundación", description: "Primeras entregas por WhatsApp con una inversión personal." },
              { year: "2019", title: "Primeros corporativos", description: "Empresas descubren nuestros packs como solución de bienestar." },
              { year: "2021", title: "E-commerce", description: "Lanzamos la tienda online con delivery en Lima." },
              { year: "2023", title: "ComeBerries", description: "Nace el programa de bienestar corporativo integral." },
              { year: "2024", title: "HORECA + Export", description: "Abrimos canales para restaurantes y exportación." },
              { year: "2026", title: "Tienda física", description: "Próxima apertura en Barranco, Lima." },
            ].map((milestone) => (
              <div
                key={milestone.year}
                className="flex flex-col gap-2 p-4 lg:p-5 bg-bg-primary rounded-xl border border-border-subtle"
              >
                <span className="text-2xl lg:text-3xl font-bold text-berry-red">
                  {milestone.year}
                </span>
                <h3 className="text-sm lg:text-base font-bold text-text-primary">
                  {milestone.title}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1000px] mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 lg:gap-2">
              <span className="text-[32px] lg:text-[48px] font-bold text-text-inverse">
                {stat.value}
              </span>
              <span className="text-sm lg:text-base text-white/80 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Channels Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-12 max-w-[1100px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              4 Líneas de Negocio
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[500px]">
              Atendemos familias, empresas, restaurantes y exportamos al mundo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
            {channels.map((channel) => (
              <Link
                key={channel.title}
                href={channel.href}
                className="flex items-start gap-4 bg-bg-surface p-5 lg:p-6 rounded-xl border border-border-subtle hover:border-berry-red/30 transition-colors group"
              >
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl ${channel.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <channel.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${channel.color}`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base lg:text-lg font-bold text-text-primary group-hover:text-berry-red transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {channel.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              Nuestro Proceso
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center">
              Del campo peruano a tu puerta, con frescura garantizada
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-3 lg:gap-4 text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-berry-red-light flex items-center justify-center relative">
                  <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-berry-red" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-berry-red text-text-inverse text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
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

      {/* Commitment Section */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 max-w-[700px] mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-berry-green-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
            <Leaf className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-green" />
            <span className="text-xs lg:text-sm font-semibold text-berry-green">
              Nuestro Compromiso
            </span>
          </div>
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-primary">
            100% natural, sin preservantes
          </h2>
          <p className="text-[15px] lg:text-lg text-text-secondary leading-relaxed">
            Trabajamos con productores de Ica, Trujillo y Huancayo. Cada lote es inspeccionado antes de salir. Si no cumple nuestro estándar, no sale. Tu bienestar es nuestra prioridad.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {["Sin preservantes", "Sin químicos", "Cadena de frío", "Del campo a tu mesa"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-berry-green" />
                <span className="text-sm font-medium text-text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          <p className="text-sm lg:text-base font-semibold text-text-tertiary uppercase tracking-wider">
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
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20 flex flex-col items-center gap-5 lg:gap-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-text-primary text-center max-w-[300px] lg:max-w-none">
          ¿Listo para probar nuestros berries?
        </h2>
        <p className="hidden lg:block text-lg text-text-secondary text-center">
          Haz tu pedido ahora y recíbelo hoy mismo
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
          <Link href="https://wa.me/51952805608" target="_blank" className="w-full lg:w-auto">
            <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
              <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
              Pedir por WhatsApp
            </Button>
          </Link>
          <Link href="/tienda" className="w-full lg:w-auto">
            <Button variant="primary" size="lg" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
