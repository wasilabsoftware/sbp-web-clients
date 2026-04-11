"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user, setReturnUrl, initialize } =
    useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setReturnUrl(pathname);
      router.replace("/login");
      return;
    }

    if (user && !user.hasCompletedOnboarding) {
      setReturnUrl(pathname);
      router.replace("/onboarding");
    }
  }, [isAuthenticated, isLoading, user, router, pathname, setReturnUrl]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="w-8 h-8 border-4 border-berry-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
