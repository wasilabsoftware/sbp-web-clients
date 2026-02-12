import { Suspense } from "react";
import { CheckoutResult } from "@/components/shop/CheckoutResult";
import { Loader2 } from "lucide-react";

function ResultSkeleton() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-surface rounded-xl shadow-[0_4px_20px_var(--shadow-color)] max-w-[520px] w-full p-8 text-center">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin mx-auto" />
        <p className="mt-4 text-text-secondary">Cargando resultado...</p>
      </div>
    </div>
  );
}

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<ResultSkeleton />}>
      <CheckoutResult />
    </Suspense>
  );
}
