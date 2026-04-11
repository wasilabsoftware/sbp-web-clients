"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Truck, Leaf, Clock, Mail, Lock, LogIn } from "lucide-react";
import { loginSchema } from "@/lib/validations/auth";
import type { ApiError } from "@/types/auth";

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "Email o contraseña incorrectos",
  ACCOUNT_DISABLED: "Tu cuenta ha sido desactivada. Contacta soporte.",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, setReturnUrl, returnUrl } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);

      const { user } = useAuth.getState();

      if (user && !user.hasCompletedOnboarding) {
        router.push("/onboarding");
        return;
      }

      const destination = returnUrl || "/mi-cuenta";
      setReturnUrl(null);
      router.push(destination);
    } catch (err) {
      const apiError = err as ApiError;
      const message =
        ERROR_MESSAGES[apiError.code] ||
        apiError.error ||
        "Error al iniciar sesión";
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

      {/* Right Panel - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-20 bg-bg-surface">
        <div className="w-full max-w-[400px] flex flex-col gap-7 lg:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] lg:text-3xl font-bold text-text-primary">
              Iniciar Sesión
            </h2>
            <p className="text-sm lg:text-base text-text-secondary">
              Accede a tu cuenta para ver tus pedidos
            </p>
          </div>

          {serverError && (
            <div className="bg-berry-red-light border border-berry-red/20 rounded-[--radius-md] px-4 py-3">
              <p className="text-sm text-berry-red">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-4">
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.email}
              required
            />

            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-[18px] h-[18px] lg:w-5 lg:h-5" />}
              error={errors.password}
              required
            />

            <div className="flex justify-end">
              <Link
                href="/recuperar"
                className="text-[13px] lg:text-sm text-berry-red hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 lg:h-[52px] flex items-center justify-center gap-2 bg-berry-red text-white font-semibold rounded-[--radius-md] hover:bg-berry-red-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-[18px] h-[18px]" />
                  <span className="text-sm lg:text-base">Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs lg:text-sm text-text-tertiary max-w-[280px] lg:max-w-none mx-auto">
            Al iniciar sesión aceptas nuestros{" "}
            <Link href="/terminos" className="text-berry-red hover:underline">
              Términos y Condiciones
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[13px] lg:text-sm text-text-secondary">
              ¿No tienes cuenta?
            </span>
            <Link
              href="/registro"
              className="text-[13px] lg:text-sm text-berry-red font-semibold hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
