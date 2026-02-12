import { Suspense } from "react";
import { CheckoutClient } from "@/components/shop/CheckoutClient";
import { Loader2 } from "lucide-react";

function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-surface rounded-[--radius-lg] shadow-card max-w-md w-full p-8 text-center">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin mx-auto" />
        <p className="mt-4 text-text-secondary">Preparando tu pago...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutClient />
    </Suspense>
  );
}
