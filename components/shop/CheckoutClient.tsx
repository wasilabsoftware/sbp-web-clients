"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CheckoutStepper } from "@/components/shop/checkout/CheckoutStepper";
import { CheckoutOrderSummary } from "@/components/shop/checkout/CheckoutOrderSummary";
import { DeliveryForm } from "@/components/shop/checkout/DeliveryForm";
import { CheckoutConfirm } from "@/components/shop/checkout/CheckoutConfirm";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import type { DeliveryFormData } from "@/lib/validations/checkout";

export function CheckoutClient() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, meData, setReturnUrl, initialize } = useAuth();
  const { cart, isLoading: cartLoading, fetchCart, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData | null>(null);

  // Initialize auth
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Auth check: redirect to login if not authenticated
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setReturnUrl("/checkout");
      router.replace("/login");
      return;
    }

    if (user && !user.hasCompletedOnboarding) {
      setReturnUrl("/checkout");
      router.replace("/onboarding");
    }
  }, [authLoading, isAuthenticated, user, router, setReturnUrl]);

  // Redirect to cart if empty (after loading)
  useEffect(() => {
    if (!cartLoading && cart && cart.items.length === 0) {
      router.replace("/carrito");
    }
  }, [cartLoading, cart, router]);

  // Loading state
  if (authLoading || cartLoading || !isAuthenticated || !cart) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="bg-bg-surface rounded-xl p-8 text-center shadow-[0_4px_20px_var(--shadow-color)]">
          <Loader2 className="w-8 h-8 text-berry-red animate-spin mx-auto" />
          <p className="mt-4 text-text-secondary">Preparando tu checkout...</p>
        </div>
      </div>
    );
  }

  const items = cart.items;
  const { subtotal, deliveryFee, total } = cart.summary;
  const customerId = user?.customerId;

  if (!customerId) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="bg-bg-surface rounded-xl p-8 text-center shadow-[0_4px_20px_var(--shadow-color)] max-w-md mx-5">
          <p className="text-text-secondary mb-4">
            No se encontró tu perfil de cliente. Por favor completa tu perfil
            primero.
          </p>
          <button
            onClick={() => router.push("/onboarding")}
            className="text-berry-red font-semibold hover:underline"
          >
            Completar perfil
          </button>
        </div>
      </div>
    );
  }

  // Pre-fill delivery form from user profile
  const initialDeliveryData: Partial<DeliveryFormData> = {
    address: meData?.customer?.address ?? "",
    districtId: meData?.customer?.districtId ?? undefined,
    addressReference: meData?.customer?.addressReference ?? "",
    phone: meData?.customer?.phone ?? user?.phone ?? "",
  };

  const handleDeliverySubmit = (data: DeliveryFormData) => {
    setDeliveryData(data);
    setStep(3);
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between bg-bg-surface h-16 px-5">
        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
            } else {
              router.push("/carrito");
            }
          }}
          className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">Checkout</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[640px] mx-auto px-5 lg:px-0 py-6 lg:py-10">
          {/* Stepper */}
          <div className="mb-8">
            <CheckoutStepper
              currentStep={step}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Step Content */}
          {step === 1 && (
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              onContinue={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <DeliveryForm
              initialData={deliveryData ?? initialDeliveryData}
              onSubmit={handleDeliverySubmit}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && deliveryData && (
            <CheckoutConfirm
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              customerId={customerId}
              deliveryData={deliveryData}
              onBack={() => setStep(2)}
              onCartClear={clearCart}
            />
          )}
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}
