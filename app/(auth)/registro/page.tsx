"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Truck, Leaf, Clock, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { registerSchema } from "@/lib/validations/auth";
import type { ApiError } from "@/types/auth";

const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_EXISTS: "Este email ya está registrado. ¿Quieres iniciar sesión?",
  WEAK_PASSWORD: "La contraseña no cumple con los requisitos de seguridad",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",
};

export default function RegistroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone || undefined,
      });

      router.push("/onboarding");
    } catch (err) {
      const apiError = err as ApiError;
      const message =
        ERROR_MESSAGES[apiError.code] ||
        apiError.error ||
        "Error al crear la cuenta";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Mobile Header */}
      <div className="flex lg:hidden flex-col items-center justify-center gap-4 bg-berry-red px-6 py-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span className="text-berry-red text-xl font-bold">SB</span>
        </div>
        <h1 className="text-[28px] font-bold text-white">
          Súper Berries Perú
        </h1>
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
          <h1 className="text-4xl font-bold text-white">
            Súper Berries Perú
          </h1>
          <p className="text-lg text-white/90 text-center italic whitespace-nowrap">
            Frutas frescas directo a tu puerta
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-12">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-white" />
            <span className="text-white/90">
              Envío gratis en pedidos desde S/100
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
        <div className="w-full max-w-[400px] flex flex-col gap-6 lg:gap-7">
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] lg:text-3xl font-bold text-text-primary">
              Crear Cuenta
            </h2>
            <p className="text-sm lg:text-base text-text-secondary">
              Regístrate para empezar a comprar
            </p>
          </div>

          {serverError && (
            <div className="bg-berry-red-light border border-berry-red/20 rounded-[--radius-md] px-4 py-3">
              <p className="text-sm text-berry-red">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-4">
            <Input
              type="text"
              name="fullName"
              label="Nombre completo"
              placeholder="Juan Pérez García"
              value={formData.fullName}
              onChange={handleChange}
              icon={<User className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.fullName}
              required
            />

            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.email}
              required
            />

            <Input
              type="tel"
              name="phone"
              label="Teléfono (opcional)"
              placeholder="999 888 777"
              value={formData.phone}
              onChange={handleChange}
              icon={<Phone className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.phone}
            />

            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.password}
              required
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<Lock className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.confirmPassword}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 lg:h-[52px] flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-[--radius-md] hover:bg-berry-red-dark transition-colors disabled:opacity-50 mt-1"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-[18px] h-[18px]" />
                  <span className="text-sm lg:text-base">Crear Cuenta</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs lg:text-sm text-text-tertiary max-w-[280px] lg:max-w-none mx-auto">
            Al registrarte aceptas nuestros{" "}
            <Link href="/terminos" className="text-berry-red hover:underline">
              Términos y Condiciones
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[13px] lg:text-sm text-text-secondary">
              ¿Ya tienes cuenta?
            </span>
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
