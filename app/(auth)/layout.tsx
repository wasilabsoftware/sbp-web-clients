import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Super Berries Perú",
  description: "Accede a tu cuenta de Super Berries Perú para gestionar tus pedidos y disfrutar de beneficios exclusivos.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {children}
    </div>
  );
}
