import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Leaf,
  Sprout,
  Truck,
  Snowflake,
  Headset,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CategoriesCarousel } from "@/components/shop/CategoriesCarousel";
import { ProductCard } from "@/components/shop/ProductCard";
import { FeatureCard } from "@/components/shop/FeatureCard";
import { AudienceSection } from "@/components/shop/AudienceSection";
import { EmpresasHomeSection } from "@/components/shop/EmpresasHomeSection";
import { HorecaHomeSection } from "@/components/shop/HorecaHomeSection";
import { SocialProofSection } from "@/components/shop/SocialProofSection";
import { Button } from "@/components/ui/Button";
import {
  getCategories,
  getCategoryFallbackImage,
} from "@/lib/services/category.service";
import { getFeaturedProducts } from "@/lib/services/storefront.service";
// Fallback hardcodeado para cuando la API no responde
const FALLBACK_CATEGORIES = [
  {
    title: "Berries Frescos",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1636119708793-7af9f143ac13?w=400",
    href: "/tienda?categoria=berries-frescos",
  },
  {
    title: "Congelados",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=400",
    href: "/tienda?categoria=berries-congelados",
  },
  {
    title: "Frutos Secos",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1724058663142-e6e1a5e89f2d?w=400",
    href: "/tienda?categoria=frutos-secos",
  },
  {
    title: "Súper Snacks",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1583440772344-edd2e043742c?w=400",
    href: "/tienda?categoria=super-snacks",
  },
  {
    title: "Deshidratados",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1748898297482-3c336a18cca5?w=400",
    href: "/tienda?categoria=frutas-deshidratadas",
  },
  {
    title: "Frutas Frescas",
    productCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400",
    href: "/tienda?categoria=super-frutas-frescas",
  },
];

const FALLBACK_FEATURED = [
  {
    id: "1",
    name: "Fresas",
    nameFull: "Fresas Premium",
    category: "Berries",
    categoryColor: "red" as const,
    description: "500g - Frescas del día",
    price: 9.0,
    imageUrl: "https://images.unsplash.com/photo-1768204043813-8ed923cc30cf?w=600",
    href: "/tienda/fresas-premium",
  },
  {
    id: "2",
    name: "Arándanos",
    nameFull: "Arándanos Frescos",
    category: "Berries",
    categoryColor: "red" as const,
    description: "250g - Antioxidantes naturales",
    price: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1690090953464-7d6713a9065f?w=600",
    href: "/tienda/arandanos-frescos",
  },
  {
    id: "3",
    name: "Moras",
    nameFull: "Moras Silvestres",
    category: "Berries",
    categoryColor: "red" as const,
    description: "300g - Sabor intenso",
    price: 12.0,
    imageUrl: "https://images.unsplash.com/photo-1667054071803-84272acfec7e?w=600",
    href: "/tienda/moras-silvestres",
  },
  {
    id: "4",
    name: "Aguaymanto",
    nameFull: "Aguaymanto",
    category: "Especiales",
    categoryColor: "green" as const,
    description: "200g - Superfruta peruana",
    price: 8.0,
    imageUrl: "https://images.unsplash.com/photo-1763477892923-c3fee1a33533?w=600",
    href: "/tienda/aguaymanto",
  },
];

const features = [
  {
    icon: Sprout,
    title: "Especialistas en berries desde 2017",
    description: "Berries y snacks naturales",
    descriptionFull:
      "No vendemos de todo. Nos especializamos en berries y snacks naturales. Conocemos cada producto, su origen y su mejor momento de consumo.",
  },
  {
    icon: Truck,
    title: "Del campo peruano a tu puerta en 24h",
    description: "Directo del productor",
    descriptionFull:
      "Trabajamos directo con productores de los valles del Perú. Tu pedido se prepara el día anterior y llega fresco a tu puerta.",
  },
  {
    icon: Snowflake,
    title: "Cadena de frío garantizada",
    description: "Transporte refrigerado",
    descriptionFull:
      "Cada entrega viaja en transporte refrigerado. Tus berries llegan como si los hubieras recogido tú mismo.",
  },
  {
    icon: Headset,
    title: "Atención real por WhatsApp",
    description: "Respuesta en menos de 1 hora",
    descriptionFull:
      "Hablas con personas reales. Respondemos en menos de 1 hora. Pedidos especiales, consultas, lo que necesites.",
  },
];

export default async function HomePage() {
  let categories;
  try {
    const apiCategories = await getCategories();
    categories = apiCategories
      .filter((c) => c.parentId === null)
      .map((c) => ({
        title: c.name,
        productCount: 0,
        imageUrl: c.imageUrl ?? getCategoryFallbackImage(c.slug),
        href: `/tienda?categoria=${c.slug}`,
      }));
  } catch (error) {
    console.error("Failed to fetch categories, using fallback:", error);
    categories = FALLBACK_CATEGORIES;
  }

  let featuredProducts;
  try {
    const apiFeatured = await getFeaturedProducts(4);
    featuredProducts = apiFeatured.map((p) => {
      const firstVariant = p.variants[0];
      const price = firstVariant?.calculatedPrice
        ? parseFloat(firstVariant.calculatedPrice)
        : parseFloat(p.salePrice ?? p.basePrice);
      const image =
        p.images?.[0] ?? firstVariant?.images?.[0] ?? "";
      return {
        id: p.id,
        name: p.name.length > 16 ? p.name.split(" ").slice(0, 2).join(" ") : p.name,
        nameFull: p.name,
        category: p.category.name,
        categoryColor: "red" as const,
        description: p.shortDescription ?? "",
        price,
        imageUrl: image,
        href: firstVariant
          ? `/tienda/${p.slug}?v=${firstVariant.id}`
          : `/tienda/${p.slug}`,
      };
    });
  } catch (error) {
    console.error("Failed to fetch featured products, using fallback:", error);
    featuredProducts = FALLBACK_FEATURED;
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="bg-bg-surface px-5 py-8 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center gap-6 lg:gap-15 lg:h-[600px]">
        <div className="flex flex-col items-center lg:items-start gap-6 flex-1 order-1 lg:order-none">
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2 w-fit max-w-full">
            <Leaf className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-green shrink-0" />
            <span className="text-[11px] lg:text-sm font-semibold text-berry-green">
              🚚 Envíos a Lima y Provincias
            </span>
          </div>
          <h1 className="text-[26px] lg:text-[56px] font-bold text-berry-red leading-tight text-center lg:text-left max-w-[320px] lg:max-w-[600px]">
            Mas que berries... Bienestar en cada entrega
          </h1>
          <p className="text-[15px] lg:text-lg text-text-secondary text-center lg:text-left max-w-[320px] lg:max-w-[480px]">
            Snacks saludables, frutas frescas y soluciones corporativas para personas y empresas.
          </p>

          {/* Mobile Hero Image */}
          <div className="relative w-[280px] h-[220px] lg:hidden rounded-lg overflow-hidden">
            <Image
              src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/75d59e82-80bf-4553-3cab-8ca2cb362c00/Hero"
              alt="Berries frescos"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto mt-2">
            <Link href="/tienda" className="w-full lg:w-auto">
              <Button variant="primary" size="md" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
                Compra ahora
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </Link>
            <Link href="https://wa.me/51952805608" target="_blank" className="w-full lg:w-auto">
              <Button variant="whatsapp" size="md" className="w-full lg:w-auto h-[52px] lg:h-auto justify-center">
                <MessageCircle className="w-4.5 h-4.5" />
                Pedir por WhatsApp
              </Button>
            </Link>
          </div>

          {/* Empresa Link - Mobile */}
          <Link href="/empresa" className="flex lg:hidden items-center justify-center gap-1.5 w-full text-text-tertiary hover:text-text-secondary transition-colors">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[13px] font-medium">¿Eres empresa? Ver soluciones</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          {/* Empresa Link - Desktop */}
          <Link href="/empresa" className="hidden lg:flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Soy empresa</span>
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
            src="https://imagedelivery.net/hrfM92Tw965illARz9WHuA/75d59e82-80bf-4553-3cab-8ca2cb362c00/Hero"
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
        <CategoriesCarousel categories={categories} />
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
          <Link href="/tienda" className="lg:hidden">
            <span className="text-sm font-medium text-berry-red">Ver todos</span>
          </Link>
          <Link href="/tienda" className="hidden lg:block">
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

      {/* Audience Section */}
      <AudienceSection />

      {/* Empresas Section */}
      <EmpresasHomeSection />

      {/* HORECA Section */}
      <HorecaHomeSection />

      {/* Why Choose Us Section */}
      <section className="bg-berry-red px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-1 lg:gap-3 mb-6 lg:mb-12">
          <h2 className="text-2xl lg:text-[40px] font-bold text-text-inverse text-center">
            Por qué más de 7,400 pedidos nos eligen
          </h2>
          <p className="hidden lg:block text-lg text-white/80 text-center max-w-[560px]">
            No somos un delivery más. Somos especialistas en berries con 7 años convirtiendo lo saludable en práctico.
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

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* CTA Final Section */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-6 lg:gap-10 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h2 className="text-2xl lg:text-[40px] font-bold text-text-primary text-center">
              Empieza hoy. Elige cómo quieres pedir.
            </h2>
            <p className="hidden lg:block text-lg text-text-secondary text-center max-w-[560px]">
              Delivery en Lima, atención real por WhatsApp, y soluciones para personas, empresas y restaurantes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
            {/* Personas */}
            <div className="bg-bg-primary border border-border-subtle rounded-2xl p-5 lg:p-6 flex flex-col gap-4 items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-berry-red-light flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-berry-red" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Quiero comprar para mí
              </h3>
              <p className="text-sm text-text-secondary">
                Berries frescos, snacks y frutas naturales con delivery en Lima.
              </p>
              <div className="flex flex-col gap-2 w-full mt-auto">
                <Link href="/tienda">
                  <button className="w-full flex items-center justify-center gap-2 bg-berry-red hover:bg-berry-red/90 text-text-inverse px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
                    Ver tienda
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="https://wa.me/51952805608" target="_blank">
                  <button className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:opacity-90 text-text-inverse px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Pedir por WhatsApp
                  </button>
                </Link>
              </div>
            </div>

            {/* Empresas */}
            <div className="bg-bg-primary border border-border-subtle rounded-2xl p-5 lg:p-6 flex flex-col gap-4 items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-berry-red-light flex items-center justify-center">
                <Building2 className="w-6 h-6 text-berry-red" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Quiero un programa para mi equipo
              </h3>
              <p className="text-sm text-text-secondary">
                Bienestar corporativo con snacks, asesoría y experiencias saludables.
              </p>
              <div className="flex flex-col gap-2 w-full mt-auto">
                <Link href="/contacto?tipo=empresa">
                  <button className="w-full flex items-center justify-center gap-2 bg-berry-red hover:bg-berry-red/90 text-text-inverse px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
                    Agendar reunión
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* HORECA */}
            <div className="bg-bg-primary border border-border-subtle rounded-2xl p-5 lg:p-6 flex flex-col gap-4 items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-berry-green-light flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-berry-green" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Necesito abastecimiento HORECA
              </h3>
              <p className="text-sm text-text-secondary">
                Berries premium para restaurantes, hoteles y catering en Lima.
              </p>
              <div className="flex flex-col gap-2 w-full mt-auto">
                <Link
                  href="https://wa.me/51952805608?text=Hola%2C%20me%20interesa%20el%20abastecimiento%20HORECA%20de%20berries"
                  target="_blank"
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:opacity-90 text-text-inverse px-5 py-3 rounded-lg font-semibold text-sm transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Cotizar por WhatsApp
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
