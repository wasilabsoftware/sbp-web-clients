import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, icon, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full h-[52px] px-4 ${icon ? "pl-12" : ""}
              bg-bg-muted rounded-[--radius-md]
              text-text-primary placeholder:text-text-tertiary
              border border-transparent
              focus:outline-none focus:border-berry-red focus:bg-bg-surface
              transition-colors
              ${error ? "border-berry-red bg-berry-red-light" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <span className="text-sm text-berry-red">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
