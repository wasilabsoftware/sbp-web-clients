import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactForm } from "@/components/shop/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+51 952 805 608",
    description: "Respondemos en menos de 1 hora",
    href: "https://wa.me/51952805608",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: "hola@superberries.pe",
    description: "Para consultas detalladas",
    href: "mailto:hola@superberries.pe",
    highlight: false,
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+51 952 805 608",
    description: "Lunes a Sábado 8am - 6pm",
    href: "tel:+51952805608",
    highlight: false,
  },
];

const faqItems = [
  {
    question: "¿Cuál es el pedido mínimo?",
    answer:
      "No hay pedido mínimo. Puedes pedir desde 1 clamshell de 100g. Todos los productos están disponibles en distintas presentaciones.",
  },
  {
    question: "¿Cuánto cuesta el delivery?",
    answer:
      "El delivery cuesta S/10 en Lima Metropolitana. Es gratis en pedidos desde S/100.",
  },
  {
    question: "¿Hacen envíos a provincia?",
    answer:
      "Actualmente realizamos delivery solo en Lima Metropolitana. Para pedidos en provincia, contáctanos por WhatsApp para evaluar opciones de envío.",
  },
  {
    question: "¿Los productos son orgánicos?",
    answer:
      "Nuestros productos son 100% naturales, sin preservantes ni químicos. Trabajamos directamente con agricultores peruanos que siguen prácticas de cultivo responsable.",
  },
  {
    question: "¿Cómo conservo los berries?",
    answer:
      "Frescos: refrigerar inmediatamente y consumir en 3-5 días. Congelados: mantener en freezer, duran hasta 12 meses. No lavar hasta el momento de consumir.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Yape, Plin, transferencia bancaria y pago con tarjeta a través de nuestra web. También puedes pagar contra entrega en efectivo.",
  },
  {
    question: "¿Tienen programas para empresas?",
    answer:
      "Sí, nuestro programa #ComeBerries #ComeSano incluye snacks saludables, asesoría nutricional, pausas activas y coaching organizacional. Empresas como NEXA, SUNARP y MEDIFARMA ya confían en nosotros.",
  },
];

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <LocalBusinessSchema />
      <FAQSchema items={faqItems} />
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-3 lg:gap-4 max-w-[600px] mx-auto text-center">
          <h1 className="text-[32px] lg:text-[48px] font-bold text-text-primary">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-[15px] lg:text-lg text-text-secondary">
            Elige tu canal y contáctanos. Respondemos en menos de 1 hora por WhatsApp.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-bg-primary px-5 py-6 lg:px-20 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-4 p-5 rounded-xl border transition-colors ${
                info.highlight
                  ? "border-whatsapp bg-whatsapp/5 hover:bg-whatsapp/10"
                  : "border-border-subtle hover:border-berry-red/30"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                  info.highlight ? "bg-whatsapp" : "bg-berry-red-light"
                }`}
              >
                <info.icon
                  className={`w-5 h-5 ${
                    info.highlight ? "text-text-inverse" : "text-berry-red"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary">
                  {info.title}
                </span>
                <span className="text-sm font-medium text-berry-red">
                  {info.value}
                </span>
                <span className="text-xs text-text-tertiary">
                  {info.description}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-16">
        <div className="max-w-[700px] mx-auto">
          <div className="bg-bg-surface rounded-2xl p-6 lg:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary mb-6">
              Escríbenos
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-6 max-w-[700px] mx-auto">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-text-primary text-center">
              Zona de Delivery
            </h2>
            <p className="text-sm lg:text-base text-text-secondary text-center">
              Entregamos en todo Lima Metropolitana
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-berry-red" />
              <span className="text-sm text-text-secondary">Lima Metropolitana</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-berry-red" />
              <span className="text-sm text-text-secondary">Lunes a Sábado 8am - 6pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-primary text-center mb-8 lg:mb-12">
            Preguntas Frecuentes
          </h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
