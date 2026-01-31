import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Leaf,
  Truck,
  ShieldCheck,
  Heart,
  ShoppingBag,
  Building2,
  Briefcase,
  ChevronRight,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { ProductCard } from "@/components/shop/ProductCard";
import { FeatureCard } from "@/components/shop/FeatureCard";
import { B2BSection } from "@/components/shop/B2BSection";
import { Button } from "@/components/ui/Button";

const categories = [
  {
    title: "Berries",
    productCount: 12,
    imageUrl: "https://images.unsplash.com/photo-1636119708793-7af9f143ac13?w=400",
    href: "/productos?categoria=berries",
  },
  {
    title: "Frutos Secos",
    productCount: 8,
    imageUrl: "https://images.unsplash.com/photo-1724058663142-e6e1a5e89f2d?w=400",
    href: "/productos?categoria=frutos-secos",
  },
  {
    title: "Especiales",
    productCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1583440772344-edd2e043742c?w=400",
    href: "/productos?categoria=especiales",
  },
  {
    title: "Deshidratados",
    productCount: 6,
    imageUrl: "https://images.unsplash.com/photo-1748898297482-3c336a18cca5?w=400",
    href: "/productos?categoria=deshidratados",
  },
];

const featuredProducts = [
  {
    id: "1",
    name: "Fresas",
    nameFull: "Fresas Premium",
    category: "Berries",
    categoryColor: "red" as const,
    description: "500g - Frescas del día",
    price: 18.9,
    imageUrl: "https://images.unsplash.com/photo-1768204043813-8ed923cc30cf?w=600",
    href: "/productos/fresas-premium",
  },
  {
    id: "2",
    name: "Arándanos",
    nameFull: "Arándanos Frescos",
    category: "Berries",
    categoryColor: "red" as const,
    description: "250g - Antioxidantes naturales",
    price: 24.9,
    imageUrl: "https://images.unsplash.com/photo-1690090953464-7d6713a9065f?w=600",
    href: "/productos/arandanos-frescos",
  },
  {
    id: "3",
    name: "Moras",
    nameFull: "Moras Silvestres",
    category: "Berries",
    categoryColor: "red" as const,
    description: "300g - Sabor intenso",
    price: 15.9,
    imageUrl: "https://images.unsplash.com/photo-1667054071803-84272acfec7e?w=600",
    href: "/productos/moras-silvestres",
  },
  {
    id: "4",
    name: "Aguaymanto",
    nameFull: "Aguaymanto",
    category: "Especiales",
    categoryColor: "green" as const,
    description: "200g - Superfruta peruana",
    price: 12.9,
    imageUrl: "https://images.unsplash.com/photo-1763477892923-c3fee1a33533?w=600",
    href: "/productos/aguaymanto",
  },
];

const features = [
  {
    icon: Truck,
    title: "Delivery Rápido",
    description: "Entrega el mismo día en Lima",
    descriptionFull: "Entrega el mismo día en Lima Metropolitana",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Sin preservantes ni químicos",
    descriptionFull: "Sin preservantes ni químicos. Directo del campo.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad Garantizada",
    description: "Selección rigurosa de productos",
    descriptionFull: "Selección rigurosa para tu satisfacción",
  },
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Pedidos especiales y atención por WhatsApp",
    descriptionFull: "Pedidos especiales y atención por WhatsApp",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-8 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center gap-6 lg:gap-15 lg:h-[600px]">
        <div className="flex flex-col items-center lg:items-start gap-6 flex-1 order-1 lg:order-none">
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2 w-fit">
            <Leaf className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-green" />
            <span className="text-xs lg:text-sm font-semibold text-berry-green">
              100% Natural y Fresco
            </span>
          </div>
          <h1 className="text-[32px] lg:text-[56px] font-bold text-text-primary leading-tight text-center lg:text-left max-w-[320px] lg:max-w-[500px]">
            Berries Frescos
            <br />
            Directo a Tu Mesa
          </h1>
          <p className="text-[15px] lg:text-lg text-text-secondary text-center lg:text-left max-w-[320px] lg:max-w-[480px]">
            Descubre nuestra selección premium de fresas, arándanos, moras, aguaymanto y más. Cultivados con amor en los valles del Perú.
          </p>

          {/* Mobile Hero Image */}
          <div className="relative w-[280px] h-[220px] lg:hidden rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1588053422059-1ea604843686?w=600"
              alt="Berries frescos"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto mt-2">
            <Link href="/productos" className="w-full lg:w-auto">
              <Button variant="primary" size="md" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
                Ver Catálogo
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </Link>
            <Link href="https://wa.me/51999888777" target="_blank" className="w-full lg:w-auto">
              <Button variant="whatsapp" size="md" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
                <MessageCircle className="w-4.5 h-4.5" />
                Pedir por WhatsApp
              </Button>
            </Link>
          </div>

          {/* B2B Link - Mobile */}
          <Link href="/b2b" className="flex lg:hidden items-center justify-center gap-1.5 w-full text-text-tertiary hover:text-text-secondary transition-colors">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[13px] font-medium">¿Eres empresa? Soluciones B2B</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* B2B Link - Desktop */}
          <Link href="/b2b" className="hidden lg:flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">¿Eres empresa? Conoce nuestras soluciones B2B</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Canal Empresarial Link */}
          {/* <Link href="#" className="flex items-center gap-2 text-berry-red hover:text-berry-red/80 transition-colors">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Accede al Canal Empresarial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link> */}
        </div>

        {/* Desktop Hero Image */}
        <div className="hidden lg:block relative w-[520px] h-[440px] rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1605674543277-12aa4ed9356d?w=1080"
            alt="Berries frescos"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-bg-primary px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-start lg:items-center gap-1 lg:gap-3 mb-6 lg:mb-12">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary lg:text-center">
            Categorías
          </h2>
          <p className="hidden lg:block text-lg text-text-secondary text-center">
            Explora nuestra variedad de productos frescos y deliciosos
          </p>
        </div>
        <div className="flex gap-3 lg:gap-6 lg:justify-center overflow-x-auto pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
          <div className="hidden lg:block">
            <CategoryCard {...categories[3]} />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex items-center justify-between mb-5 lg:mb-12">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary">
              Destacados
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary">
              Los favoritos de nuestros clientes
            </p>
          </div>
          <Link href="/productos" className="lg:hidden">
            <span className="text-sm font-medium text-berry-red">Ver todos</span>
          </Link>
          <Link href="/productos" className="hidden lg:block">
            <Button variant="outline" size="md">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile: 2-column grid with compact cards */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              href={product.href}
              compact
            />
          ))}
        </div>

        {/* Desktop: 4-column grid with full cards */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.nameFull}
              category={product.category}
              categoryColor={product.categoryColor}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              href={product.href}
            />
          ))}
        </div>
      </section>

      {/* B2B Section */}
      <B2BSection />

      {/* Why Choose Us Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-1 lg:gap-3 mb-6 lg:mb-12">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-inverse text-center">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="hidden lg:block text-lg text-white/80 text-center">
            Calidad, frescura y servicio que nos distingue
          </p>
        </div>

        {/* Mobile: Vertical list (only 3 features) */}
        <div className="flex flex-col gap-5 lg:hidden">
          {features.slice(0, 3).map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Desktop: Horizontal grid (all 4 features) */}
        <div className="hidden lg:flex justify-center gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.descriptionFull}
            />
          ))}
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
          <Link href="https://wa.me/51999888777" target="_blank" className="w-full lg:w-auto">
            <Button variant="whatsapp" size="lg" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
              <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
              Pedir por WhatsApp
            </Button>
          </Link>
          <Link href="/productos" className="w-full lg:w-auto">
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
