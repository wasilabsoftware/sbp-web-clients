"use client";

import { Check } from "lucide-react";

const STEPS = [
  { label: "Resumen", shortLabel: "Resumen" },
  { label: "Datos de Envío", shortLabel: "Envío" },
  { label: "Confirmar y Pagar", shortLabel: "Pago" },
];

interface CheckoutStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function CheckoutStepper({
  currentStep,
  onStepClick,
}: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 lg:gap-4 w-full">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isClickable = isCompleted && onStepClick;

        return (
          <div key={step.label} className="flex items-center gap-2 lg:gap-4">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(stepNumber)}
              disabled={!isClickable}
              className={`flex items-center gap-2 lg:gap-2.5 px-3 lg:px-4 py-2 lg:py-2.5 rounded-full transition-colors ${
                isCurrent
                  ? "bg-berry-red text-white"
                  : isCompleted
                    ? "bg-berry-green-light text-berry-green cursor-pointer hover:bg-berry-green/20"
                    : "bg-bg-muted text-text-tertiary"
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-white/20">
                  {stepNumber}
                </span>
              )}
              <span className="text-xs lg:text-sm font-medium">
                <span className="lg:hidden">{step.shortLabel}</span>
                <span className="hidden lg:inline">{step.label}</span>
              </span>
            </button>

            {index < STEPS.length - 1 && (
              <div
                className={`w-6 lg:w-10 h-px ${
                  stepNumber < currentStep ? "bg-berry-green" : "bg-border-subtle"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
