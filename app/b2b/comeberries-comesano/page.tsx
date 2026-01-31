import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import {
  Building2,
  Phone,
  ArrowDown,
  Gift,
  Cookie,
  Heart,
  CircleCheck,
  Apple,
  Salad,
  Activity,
  Brain,
  Zap,
  Smile,
  HeartPulse,
  TrendingUp,
  CalendarCheck,
  Scale,
  Package,
  Check,
  X,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = createMetadata({
  title: "#ComeBerries #ComeSano - Programa de Bienestar Corporativo",
  description:
    "Programa integral de bienestar con snacks saludables, asesoría nutricional, pausas activas y coaching organizacional para empresas en Perú.",
  canonical: "/b2b/comeberries-comesano",
  keywords: [
    "ComeBerries",
    "ComeSano",
    "bienestar corporativo",
    "snacks saludables empresas",
    "pausas activas",
    "coaching organizacional",
    "nutrición empresarial",
  ],
});

// Problem cards data - different text for mobile
const problemCards = {
  desktop: [
    {
      icon: Gift,
      title: "Regalos sin impacto",
      description: "Los regalos tradicionales dejaron de sorprender a los colaboradores",
    },
    {
      icon: Cookie,
      title: "Snacks ocasionales",
      description: "Un snack o salida ocasional ya no es suficiente para motivar",
    },
    {
      icon: Heart,
      title: "Falta de conexión",
      description: "Los colaboradores esperan detalles auténticos que los hagan sentir cuidados",
    },
  ],
  mobile: [
    { icon: Gift, text: "Regalos tradicionales sin impacto" },
    { icon: Cookie, text: "Snacks ocasionales no motivan" },
    { icon: Heart, text: "Falta de conexión y cuidado" },
  ],
};

// Solution pillars data - different descriptions for mobile
const solutionPillars = {
  desktop: [
    {
      icon: Apple,
      iconColor: "text-berry-red",
      bgColor: "bg-berry-red-light",
      title: "Snacks Saludables",
      description: "Berries y frutos secos seleccionados para energía natural",
    },
    {
      icon: Salad,
      iconColor: "text-berry-green",
      bgColor: "bg-berry-green-light",
      title: "Asesoría Nutricional",
      description: "Charlas virtuales con nutricionista especializada",
    },
    {
      icon: Activity,
      iconColor: "text-[#F5A623]",
      bgColor: "bg-[#FFF3E0]",
      title: "Cuerpo Activo",
      description: "Pausas activas para el bienestar físico diario",
    },
    {
      icon: Brain,
      iconColor: "text-berry-purple",
      bgColor: "bg-[#E8E0FF]",
      title: "Mente Entrenada",
      description: "Coaching organizacional para equilibrio mental",
    },
  ],
  mobile: [
    {
      icon: Apple,
      iconColor: "text-berry-red",
      bgColor: "bg-berry-red-light",
      title: "Snacks Saludables",
      description: "Berries y frutos secos",
    },
    {
      icon: Salad,
      iconColor: "text-berry-green",
      bgColor: "bg-berry-green-light",
      title: "Asesoría Nutricional",
      description: "Charlas con nutricionista",
    },
    {
      icon: Activity,
      iconColor: "text-[#F5A623]",
      bgColor: "bg-[#FFF3E0]",
      title: "Cuerpo Activo",
      description: "Pausas activas diarias",
    },
    {
      icon: Brain,
      iconColor: "text-berry-purple",
      bgColor: "bg-[#E8E0FF]",
      title: "Mente Entrenada",
      description: "Coaching organizacional",
    },
  ],
};

// Benefits data - different for mobile (4 items) and desktop (6 items)
const benefits = {
  desktop: [
    { icon: Zap, text: "Más energía y motivación cada día" },
    { icon: Smile, text: "Bienestar que aumenta la satisfacción y autoestima" },
    { icon: HeartPulse, text: "Estrés bajo control, colaboradores más felices" },
    { icon: TrendingUp, text: "Conciencia saludable, más productividad" },
    { icon: CalendarCheck, text: "Menos ausentismo laboral" },
    { icon: Scale, text: "Salud física y mental en equilibrio" },
  ],
  mobile: [
    { icon: Zap, text: "Más energía y motivación" },
    { icon: Smile, text: "Mayor satisfacción y autoestima" },
    { icon: HeartPulse, text: "Estrés bajo control" },
    { icon: TrendingUp, text: "Más productividad" },
  ],
};

// Plans data - mobile shows condensed features for plans 2-4
type PlanFeature = {
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  color: string;
  borderColor: string;
  tag?: string;
  features: PlanFeature[];
  mobileFeature?: string; // Condensed feature for mobile
  buttonStyle: "filled" | "outline";
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "¡Súper Berries!",
    color: "berry-red",
    borderColor: "border-berry-red",
    tag: "COMPLETO",
    features: [
      { text: "Snacks saludables con branding", included: true },
      { text: "Charlas de nutrición virtuales", included: true },
      { text: "Pausas activas", included: true },
      { text: "Coaching organizacional", included: true },
    ],
    buttonStyle: "filled",
    highlighted: true,
  },
  {
    name: "¡Berries Activo!",
    color: "berry-green",
    borderColor: "border-berry-green",
    features: [
      { text: "Snacks saludables con branding", included: true },
      { text: "Asesoramiento nutricional virtual", included: true },
      { text: "Pausas activas", included: true },
      { text: "Coaching organizacional", included: false },
    ],
    mobileFeature: "Snacks, Nutrición, Pausas activas",
    buttonStyle: "outline",
  },
  {
    name: "¡Berries Vital!",
    color: "[#F5A623]",
    borderColor: "border-[#F5A623]",
    features: [
      { text: "Snacks saludables con branding", included: true },
      { text: "Asesoramiento nutricional virtual", included: true },
      { text: "Pausas activas", included: false },
      { text: "Coaching organizacional", included: false },
    ],
    mobileFeature: "Snacks + Asesoría nutricional",
    buttonStyle: "outline",
  },
  {
    name: "¡Berries Esencial!",
    color: "berry-purple",
    borderColor: "border-berry-purple",
    features: [
      { text: "Snacks saludables con branding", included: true },
      { text: "Asesoramiento nutricional virtual", included: false },
      { text: "Pausas activas", included: false },
      { text: "Coaching organizacional", included: false },
    ],
    mobileFeature: "Snacks saludables con branding",
    buttonStyle: "outline",
  },
];

// Services data (desktop only)
const services = [
  {
    image: "https://images.unsplash.com/photo-1625552188877-85dc9c1f418a?w=800",
    title: "Regalos para Empleados",
    description: "Welcome Pack, Aniversarios, Reuniones de Equipo y Canastas Navideñas Saludables",
    quote: "\"Los pequeños detalles son los que marcan la diferencia\"",
  },
  {
    image: "https://images.unsplash.com/photo-1573224395799-3e4f21436779?w=800",
    title: "Tabla de Quesos y Berries",
    description: "Presentación premium para reuniones y celebraciones. Entrega en oficina en 48 horas.",
    quote: "\"Un compartir premium y saludable\"",
  },
  {
    image: "https://images.unsplash.com/photo-1574064577165-27cb98ca8209?w=800",
    title: "Cesta de Frutas y Berries",
    description: "Servicio semanal de fruta fresca. 100% externalizado con entrega directa.",
    quote: "\"Frescura semanal para tu equipo\"",
  },
];

// Clients data
const clients = ["NEXA", "SUNARP", "MEDIFARMA", "OSINERGMIN", "REFAX", "IMAGINA"];

export default function ComeSanoPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-8 lg:px-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-15">
          {/* Content */}
          <div className="flex flex-col gap-6 flex-1 items-center lg:items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
              <Building2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-red" />
              <span className="text-xs lg:text-sm font-semibold text-berry-red">
                Programa Corporativo
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-[56px] font-bold text-text-primary leading-tight text-center lg:text-left max-w-[320px] lg:max-w-none">
              #ComeBerries
              <br />
              #ComeSano
            </h1>

            {/* Slogan */}
            <p className="text-base lg:text-2xl font-medium text-berry-red text-center lg:text-left max-w-[300px] lg:max-w-[500px]">
              Bienestar que se vive, se siente y se comparte
            </p>

            {/* Description - Desktop only */}
            <p className="hidden lg:block text-lg text-text-secondary text-left max-w-[500px]">
              Un programa integral que impulsa el bienestar y la conexión en tu empresa. Snacks saludables, asesoramiento nutricional, pausas activas y coaching organizacional.
            </p>

            {/* Mobile Hero Image */}
            <div className="relative w-[320px] h-[200px] lg:hidden rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1602050580420-45f0364bc792?w=800"
                alt="Programa ComeBerries ComeSano"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
              <Link href="tel:+51952805608" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-berry-red text-text-inverse px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:bg-berry-red/90 transition-colors">
                  <Phone className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                  Solicitar Cotización
                </button>
              </Link>
              <Link href="#planes" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto flex items-center justify-center gap-2 border-2 border-berry-red text-berry-red px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:bg-berry-red/5 transition-colors">
                  Ver Planes
                  <ArrowDown className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop Hero Image */}
          <div className="hidden lg:block relative w-[500px] h-[440px] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1642635055753-3eec6c0b2a6e?w=1080"
              alt="Programa ComeBerries ComeSano"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Problem Section - "El Reto" */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-12">
          {/* Header - Desktop with badge */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-bg-surface rounded-full px-4 py-2">
              <span className="text-sm font-semibold text-berry-red">
                El Reto
              </span>
            </div>
            <h2 className="text-[40px] font-bold text-text-primary text-center">
              ¿Qué regalar hoy a los colaboradores?
            </h2>
            <p className="text-lg text-text-secondary text-center max-w-[700px]">
              Las áreas de Recursos Humanos enfrentan un reto cada vez mayor
            </p>
          </div>

          {/* Header - Mobile without badge */}
          <div className="lg:hidden flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-text-primary text-center max-w-[320px]">
              ¿Qué regalar hoy a los colaboradores?
            </h2>
            <p className="text-[15px] text-text-secondary text-center">
              Las áreas de RRHH enfrentan un reto cada vez mayor
            </p>
          </div>

          {/* Problem Cards - Desktop (vertical cards) */}
          <div className="hidden lg:grid grid-cols-3 gap-8 w-full max-w-[1100px]">
            {problemCards.desktop.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center gap-4 bg-bg-surface rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-berry-red-light flex items-center justify-center">
                  <card.icon className="w-7 h-7 text-berry-red" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary text-center">
                  {card.title}
                </h3>
                <p className="text-[15px] text-text-secondary text-center max-w-[280px]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Problem Cards - Mobile (horizontal cards) */}
          <div className="lg:hidden flex flex-col gap-3 w-full">
            {problemCards.mobile.map((card) => (
              <div
                key={card.text}
                className="flex items-center gap-4 bg-bg-surface rounded-lg p-4"
              >
                <div className="w-11 h-11 rounded-full bg-berry-red-light flex items-center justify-center shrink-0">
                  <card.icon className="w-5 h-5 text-berry-red" />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {card.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - "La Solución" */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-green-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
              <CircleCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-green" />
              <span className="text-xs lg:text-sm font-semibold text-berry-green">
                La Solución
              </span>
            </div>
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center max-w-[320px] lg:max-w-none">
              Tu bienestar es nuestra prioridad
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[700px]">
              Un programa integral basado en 4 pilares que impulsan el bienestar y la conexión en tu empresa
            </p>
          </div>

          {/* Pillars Grid - Desktop (centered cards) */}
          <div className="hidden lg:grid grid-cols-4 gap-6 w-full max-w-[1200px]">
            {solutionPillars.desktop.map((pillar) => (
              <div
                key={pillar.title}
                className={`flex flex-col items-center gap-5 ${pillar.bgColor} rounded-2xl p-8`}
              >
                <div className="w-[72px] h-[72px] rounded-full bg-bg-surface flex items-center justify-center">
                  <pillar.icon className={`w-8 h-8 ${pillar.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-text-primary text-center">
                  {pillar.title}
                </h3>
                <p className="text-sm text-text-secondary text-center max-w-[220px]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pillars - Mobile (horizontal cards) */}
          <div className="lg:hidden flex flex-col gap-3 w-full">
            {solutionPillars.mobile.map((pillar) => (
              <div
                key={pillar.title}
                className={`flex items-center gap-4 ${pillar.bgColor} rounded-lg p-4`}
              >
                <div className="w-11 h-11 rounded-full bg-bg-surface flex items-center justify-center shrink-0">
                  <pillar.icon className={`w-5 h-5 ${pillar.iconColor}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-bold text-text-primary">
                    {pillar.title}
                  </span>
                  <span className="text-[13px] text-text-secondary">
                    {pillar.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-15">
          {/* Content */}
          <div className="flex flex-col gap-6 lg:gap-8 flex-1 w-full">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl lg:text-[40px] font-bold text-text-inverse text-center lg:text-left">
                Beneficios del Programa
              </h2>
              <p className="hidden lg:block text-lg text-white/80 text-left">
                Impacto real en el bienestar de tus colaboradores
              </p>
            </div>

            {/* Benefits List - Desktop (6 items) */}
            <div className="hidden lg:flex flex-col gap-4">
              {benefits.desktop.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-4 bg-white/10 rounded-lg px-5 py-4"
                >
                  <benefit.icon className="w-6 h-6 text-text-inverse shrink-0" />
                  <span className="text-base font-medium text-text-inverse">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Benefits List - Mobile (4 items) */}
            <div className="lg:hidden flex flex-col gap-3">
              {benefits.mobile.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-3 bg-white/10 rounded-sm px-4 py-3"
                >
                  <benefit.icon className="w-5 h-5 text-text-inverse shrink-0" />
                  <span className="text-sm font-medium text-text-inverse">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Desktop only */}
          <div className="hidden lg:block relative w-[480px] h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1737308806605-82a95ada6f78?w=1080"
              alt="Beneficios del programa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="hidden lg:inline-flex items-center gap-2 bg-berry-red-light rounded-full px-4 py-2">
              <Package className="w-4 h-4 text-berry-red" />
              <span className="text-sm font-semibold text-berry-red">
                Planes Corporativos
              </span>
            </div>
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              {/* Mobile: shorter title */}
              <span className="lg:hidden">Planes Corporativos</span>
              <span className="hidden lg:inline">Elige el plan ideal para tu empresa</span>
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[600px]">
              Soluciones flexibles adaptadas a las necesidades de cada organización
            </p>
          </div>

          {/* Plans Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-6 w-full max-w-[1280px]">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col gap-6 bg-bg-surface border border-border-subtle rounded-2xl p-8"
              >
                {/* Plan Header */}
                <div className="flex flex-col items-center gap-2">
                  <h3 className={`text-2xl font-bold text-${plan.color} text-center`}>
                    {plan.name}
                  </h3>
                  {plan.tag && (
                    <span className="bg-berry-red text-text-inverse text-[11px] font-bold px-3 py-1 rounded-full">
                      {plan.tag}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2.5">
                      {feature.included ? (
                        <Check className="w-4.5 h-4.5 text-berry-green shrink-0" />
                      ) : (
                        <X className="w-4.5 h-4.5 text-text-tertiary shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-text-secondary" : "text-text-tertiary"}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="tel:+51952805608" className="mt-auto">
                  {plan.buttonStyle === "filled" ? (
                    <button className={`w-full flex items-center justify-center gap-2 bg-${plan.color} text-text-inverse px-5 py-3.5 rounded-lg font-semibold text-[15px] hover:opacity-90 transition-opacity`}>
                      Solicitar Plan
                    </button>
                  ) : (
                    <button className={`w-full flex items-center justify-center gap-2 border-2 ${plan.borderColor} text-${plan.color} px-5 py-3.5 rounded-lg font-semibold text-[15px] hover:opacity-80 transition-opacity`}>
                      Solicitar Plan
                    </button>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Plans List - Mobile */}
          <div className="lg:hidden flex flex-col gap-4 w-full">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`flex flex-col gap-4 bg-bg-surface rounded-xl p-6 ${
                  plan.highlighted ? "border-2 border-berry-red" : "border border-border-subtle"
                }`}
              >
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold text-${plan.color}`}>
                    {plan.name}
                  </h3>
                  {plan.tag && (
                    <span className="bg-berry-red text-text-inverse text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {plan.tag}
                    </span>
                  )}
                </div>

                {/* Features - Full list for first plan, condensed for others */}
                {index === 0 ? (
                  <div className="flex flex-col gap-2">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-berry-green shrink-0" />
                        <span className="text-[13px] text-text-secondary">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-berry-green shrink-0" />
                    <span className="text-[13px] text-text-secondary">
                      {plan.mobileFeature}
                    </span>
                  </div>
                )}

                {/* CTA Button */}
                <Link href="tel:+51952805608">
                  {plan.buttonStyle === "filled" ? (
                    <button className={`w-full flex items-center justify-center gap-2 bg-${plan.color} text-text-inverse px-5 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity`}>
                      Solicitar Plan
                    </button>
                  ) : (
                    <button className={`w-full flex items-center justify-center gap-2 border-2 ${plan.borderColor} text-${plan.color} px-5 py-3.5 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity`}>
                      Solicitar Plan
                    </button>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section - Desktop only */}
      <section className="hidden lg:block bg-bg-surface px-20 py-20">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-berry-red-light rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-berry-red" />
              <span className="text-sm font-semibold text-berry-red">
                Más Servicios
              </span>
            </div>
            <h2 className="text-[40px] font-bold text-text-primary text-center">
              Soluciones adicionales para tu empresa
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-[1200px]">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-5 bg-bg-muted rounded-2xl p-8"
              >
                <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[22px] font-bold text-text-primary">
                  {service.title}
                </h3>
                <p className="text-[15px] text-text-secondary max-w-[320px]">
                  {service.description}
                </p>
                <p className="text-sm text-berry-red italic font-medium">
                  {service.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-xl lg:text-[32px] font-bold text-text-primary text-center">
              Empresas que confían en nosotros
            </h2>
            <p className="hidden lg:block text-base text-text-secondary text-center max-w-[600px]">
              Más de 6 empresas líderes ya disfrutan de nuestros programas de bienestar
            </p>
          </div>

          {/* Clients Logos - Desktop */}
          <div className="hidden lg:flex flex-wrap justify-center gap-12">
            {clients.map((client) => (
              <div
                key={client}
                className="flex items-center justify-center bg-bg-surface rounded-lg px-8 py-4"
              >
                <span className="text-xl font-bold text-text-tertiary">
                  {client}
                </span>
              </div>
            ))}
          </div>

          {/* Clients Logos - Mobile (2 rows) */}
          <div className="lg:hidden flex flex-col gap-3 w-full">
            <div className="flex justify-center gap-3">
              {clients.slice(0, 3).map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center bg-bg-surface rounded-sm px-4 py-2.5"
                >
                  <span className="text-xs font-bold text-text-tertiary">
                    {client}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3">
              {clients.slice(3, 6).map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center bg-bg-surface rounded-sm px-4 py-2.5"
                >
                  <span className="text-xs font-bold text-text-tertiary">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          {/* Title - different for mobile/desktop */}
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-inverse text-center max-w-[320px] lg:max-w-[700px]">
            <span className="lg:hidden">Potencia el bienestar de tu equipo</span>
            <span className="hidden lg:inline">Estás a un paso de potenciar el bienestar de tus empleados</span>
          </h2>

          {/* Description - different for mobile/desktop */}
          <p className="text-[15px] lg:text-lg text-white/80 text-center">
            <span className="lg:hidden">Contáctanos hoy</span>
            <span className="hidden lg:inline">Contáctanos hoy y diseñemos juntos el programa ideal para tu empresa</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
            <Link href="tel:+51952805608" className="w-full lg:w-auto">
              <button className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-bg-surface text-berry-red px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:bg-white/90 transition-colors">
                <Phone className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                952 805 608
              </button>
            </Link>
            <Link href="https://wa.me/51952805608" target="_blank" className="w-full lg:w-auto">
              <button className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-whatsapp text-text-inverse px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                WhatsApp
              </button>
            </Link>
          </div>

          <p className="text-white/70 text-sm lg:text-base">
            ventas@superberriesperu.com
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
