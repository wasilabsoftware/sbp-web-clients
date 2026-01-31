import type { Metadata } from "next";
import { AuthGuard } from "@/components/portal/AuthGuard";

export const metadata: Metadata = {
  title: "Mi Cuenta",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
