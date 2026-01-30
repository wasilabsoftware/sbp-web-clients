"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Truck, Leaf, Clock, Mail, Sparkles } from "lucide-react";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement magic link registration
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Mobile Header */}
      <div className="flex lg:hidden flex-col items-center justify-center gap-4 bg-berry-red px-6 py-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span className="text-berry-red text-xl font-bold">SB</span>
        </div>
        <h1 className="text-[28px] font-bold text-white">Super Berries</h1>
        <p className="text-sm text-white/90 italic">
          Frutas frescas directo a tu puerta
        </p>
      </div>

      {/* Desktop Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-berry-red flex-col justify-center items-center p-20">
        <div className="flex flex-col items-center gap-6 max-w-md">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-berry-red text-2xl font-bold">SB</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Super Berries</h1>
          <p className="text-lg text-white/90 text-center italic whitespace-nowrap">
            Frutas frescas directo a tu puerta
          </p>
        </div>

        {/* Features - Desktop only */}
        <div className="flex flex-col gap-5 mt-12">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-white" />
            <span className="text-white/90">
              Envío gratis en pedidos mayores a S/50
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-white" />
            <span className="text-white/90">
              Productos 100% frescos y naturales
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-white" />
            <span className="text-white/90">Entrega en 24-48 horas</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-20 bg-bg-surface">
        <div className="w-full max-w-[400px] flex flex-col gap-7 lg:gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] lg:text-3xl font-bold text-text-primary">
              Crear Cuenta
            </h2>
            <p className="text-sm lg:text-base text-text-secondary">
              Regístrate para empezar a comprar
            </p>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="w-full h-12 lg:h-[52px] flex items-center justify-center gap-2.5 bg-bg-surface border border-border-subtle rounded-[--radius-md] hover:bg-bg-muted transition-colors"
            >
              <div className="w-5 h-5 bg-[#4285F4] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="text-sm lg:text-[15px] font-medium text-text-primary">
                Continuar con Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="flex-1 h-px bg-border-subtle" />
              <span className="text-[13px] lg:text-sm text-text-tertiary">o</span>
              <div className="flex-1 h-px bg-border-subtle" />
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleMagicLinkSubmit} className="flex flex-col gap-3 lg:gap-4">
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 lg:h-[52px] flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-[--radius-md] hover:bg-berry-red-dark transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-[18px] h-[18px]" />
              <span className="text-sm lg:text-base">Enviar Magic Link</span>
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs lg:text-sm text-text-tertiary max-w-[280px] lg:max-w-none mx-auto">
            Al registrarte aceptas nuestros{" "}
            <Link href="/terminos" className="text-berry-red hover:underline">
              Términos y Condiciones
            </Link>
          </p>

          {/* Login Link */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[13px] lg:text-sm text-text-secondary">¿Ya tienes cuenta?</span>
            <Link
              href="/login"
              className="text-[13px] lg:text-sm text-berry-red font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
