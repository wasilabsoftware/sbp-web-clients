import Image from "next/image";
import Link from "next/link";
import { Building2, Briefcase } from "lucide-react";

export function B2BSection() {
  return (
    <section className="bg-bg-muted px-5 py-10 lg:px-20 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-15">
        {/* Content */}
        <div className="flex flex-col gap-6 flex-1 items-center lg:items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-berry-red-light rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
            <Building2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-berry-red" />
            <span className="text-xs lg:text-sm font-semibold text-berry-red">
              Canal Empresarial
            </span>
          </div>

          {/* Title - Mobile */}
          <h2 className="lg:hidden text-2xl font-bold text-text-primary text-center">
            ¿Tienes un negocio?
          </h2>

          {/* Title - Desktop */}
          <h2 className="hidden lg:block text-[40px] font-bold text-text-primary leading-tight text-left max-w-[500px]">
            ¿Tienes un negocio?
            <br />
            Te ayudamos a crecer
          </h2>

          {/* Description - Mobile */}
          <p className="lg:hidden text-[15px] text-text-secondary text-center max-w-[320px]">
            Precios especiales, entregas programadas y atención personalizada para tu empresa.
          </p>

          {/* Description - Desktop */}
          <p className="hidden lg:block text-lg text-text-secondary text-left max-w-[480px]">
            Ofrecemos precios especiales, entregas programadas y atención personalizada para restaurantes, hoteles, cafeterías y más.
          </p>

          {/* Mobile Image - between description and button */}
          <div className="lg:hidden relative w-[320px] h-[180px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1758519288905-38b7b00c1023?w=600"
              alt="Reunión de negocios"
              fill
              className="object-cover"
            />
          </div>

          {/* CTA Button */}
          <Link
            href="/b2b"
            className="inline-flex items-center justify-center gap-2.5 lg:gap-3 bg-berry-red text-text-inverse w-full lg:w-auto px-6 py-4 lg:px-8 lg:py-4.5 rounded-lg font-semibold text-[15px] lg:text-base hover:bg-berry-red/90 transition-colors"
          >
            <Briefcase className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
            Soy Empresa
          </Link>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:block relative w-[480px] h-[360px] rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1731156679850-e73fbc21564c?w=1080"
            alt="Cocina comercial"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
