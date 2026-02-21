import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/seo/metadata";
import {
  Globe,
  Snowflake,
  ShieldCheck,
  Ship,
  FileCheck,
  Leaf,
  MessageCircle,
  Mail,
  ArrowRight,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Peruvian Berries Exporter | Fresh & Frozen | Super Berries Peru",
  description:
    "Premium fresh and frozen berries from Peru. Blueberries, strawberries, goldenberries, blackberries. Year-round supply, certified quality. Request a quote.",
  canonical: "/b2b/exportacion",
  keywords: [
    "Peru berries export",
    "Peruvian blueberries",
    "goldenberry export",
    "aguaymanto export",
    "frozen berries Peru",
    "fresh berries wholesale Peru",
    "Peru fruit exporter",
  ],
});

const products = [
  {
    name: "Blueberries",
    scientific: "Vaccinium corymbosum",
    availability: "August - March",
    description: "Premium Peruvian blueberries, calibrated for export. Counter-season supply for the Northern Hemisphere.",
  },
  {
    name: "Goldenberries (Aguaymanto)",
    scientific: "Physalis peruviana",
    availability: "Year-round",
    description: "Native Peruvian superfruit. Rich in vitamins A, C, and antioxidants. Growing global demand.",
  },
  {
    name: "Strawberries",
    scientific: "Fragaria × ananassa",
    availability: "Year-round",
    description: "Fresh strawberries from Peru's coastal valleys. Consistent quality and size.",
  },
  {
    name: "Frozen Berries (IQF)",
    scientific: "Multiple varieties",
    availability: "Year-round",
    description: "Individually Quick Frozen berries: blueberries, strawberries, blackberries, raspberries. 12+ months shelf life.",
  },
];

const whyPeru = [
  {
    icon: Globe,
    title: "#1 Blueberry Exporter",
    description: "Peru is the world's leading exporter of fresh blueberries, with ideal growing conditions year-round.",
  },
  {
    icon: Leaf,
    title: "Unique Varieties",
    description: "Native superfruits like Aguaymanto (Goldenberry) that are exclusive to the Andean region.",
  },
  {
    icon: CalendarDays,
    title: "Counter-Season Supply",
    description: "Strategic location in the Southern Hemisphere provides fresh berries when Northern markets have off-season.",
  },
  {
    icon: Ship,
    title: "Strategic Location",
    description: "Port of Callao with direct shipping routes to North America, Europe, and Asia.",
  },
];

const certifications = [
  "Global GAP",
  "HACCP",
  "BRC",
  "USDA Organic",
  "Fair Trade",
  "SENASA Phytosanitary",
];

const logistics = [
  {
    icon: Snowflake,
    title: "Cold Chain",
    description: "Temperature-controlled logistics from farm to port, ensuring product integrity.",
  },
  {
    icon: FileCheck,
    title: "Documentation",
    description: "Complete phytosanitary documentation, SENASA certificates, and customs paperwork.",
  },
  {
    icon: Ship,
    title: "Shipping Options",
    description: "FOB and CIF terms available. Consolidation at Callao port with major shipping lines.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Pre-shipment inspection, calibration reports, and quality certificates for every order.",
  },
];

export default function ExportacionPage() {
  return (
    <main lang="en" className="min-h-screen bg-bg-primary">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Business", url: "/b2b" },
          { name: "Export" },
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-15">
          <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-6 flex-1">
            <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-amber-50 rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
              <Globe className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-amber-600" />
              <span className="text-xs lg:text-sm font-semibold text-amber-600">
                EXPORT
              </span>
            </div>

            <h1 className="text-[28px] lg:text-[48px] font-bold text-text-primary leading-tight text-center lg:text-left">
              Premium Peruvian Berries for the World
            </h1>

            <p className="text-[15px] lg:text-lg text-text-secondary text-center lg:text-left max-w-[500px]">
              Fresh and frozen berries from Peru&apos;s finest valleys. Year-round supply, certified quality, competitive volumes.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto mt-2">
              <Link href="https://wa.me/51952805608?text=Hello%2C%20I'm%20interested%20in%20berry%20exports%20from%20Peru" target="_blank" className="w-full lg:w-auto">
                <Button variant="primary" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                  <Mail className="w-5 h-5" />
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contacto?tipo=export" className="w-full lg:w-auto">
                <Button variant="outline" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                  Contact Form
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full lg:w-[480px] h-[250px] lg:h-[380px] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1596591868231-05e882e79c0e?w=800"
              alt="Premium Peruvian berries for export"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Peru Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              Why Peru?
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[600px]">
              Strategic advantages that make Peru the ideal source for premium berries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
            {whyPeru.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 lg:p-6 bg-bg-surface rounded-xl border border-border-subtle"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base lg:text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              Export Products
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center">
              Premium berries available for international markets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
            {products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col gap-3 p-5 lg:p-6 bg-bg-surface rounded-xl border border-border-subtle"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base lg:text-lg font-bold text-text-primary">
                    {product.name}
                  </h3>
                  <span className="text-xs font-medium text-berry-green bg-berry-green-light px-2.5 py-1 rounded-full">
                    {product.availability}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary italic">
                  {product.scientific}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[800px] mx-auto">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-primary text-center">
            Certifications & Standards
          </h2>
          <p className="text-sm lg:text-base text-text-secondary text-center">
            We are committed to the highest quality standards for international markets.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 px-4 py-2.5 bg-bg-muted rounded-full border border-border-subtle"
              >
                <CheckCircle className="w-4 h-4 text-berry-green" />
                <span className="text-sm font-medium text-text-primary">{cert}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-tertiary text-center">
            Certifications in progress. Contact us for current status and documentation.
          </p>
        </div>
      </section>

      {/* Logistics */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
            Logistics & Shipping
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {logistics.map((item) => (
              <div key={item.title} className="flex flex-col items-center lg:items-start gap-3 text-center lg:text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-5 lg:gap-6 max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl lg:text-[36px] font-bold text-text-inverse">
            Ready to Source Premium Peruvian Berries?
          </h2>
          <p className="text-[15px] lg:text-lg text-white/80">
            Contact our export team for pricing, samples, and availability.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            <Link href="https://wa.me/51952805608?text=Hello%2C%20I'm%20interested%20in%20berry%20exports%20from%20Peru" target="_blank" className="w-full lg:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </Link>
            <a href="mailto:ventas@superberriesperu.com" className="w-full lg:w-auto">
              <Button variant="secondary" size="lg" className="w-full lg:w-auto h-[52px] justify-center">
                <Mail className="w-5 h-5" />
                ventas@superberriesperu.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
