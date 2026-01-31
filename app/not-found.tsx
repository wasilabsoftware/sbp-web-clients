import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Lo sentimos, la página que buscas no existe. Descubre nuestro catálogo de berries frescos.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="max-w-md text-center">
          {/* 404 Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-berry-red-light flex items-center justify-center">
            <Search className="w-12 h-12 text-berry-red" />
          </div>

          {/* Error Text */}
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            404
          </h1>
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            Página no encontrada
          </h2>
          <p className="text-text-secondary mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            ¡Pero tenemos deliciosos berries esperándote!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-berry-red text-text-inverse font-semibold rounded-lg hover:bg-berry-red-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-berry-red text-berry-red font-semibold rounded-lg hover:bg-berry-red-light transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Catálogo
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
