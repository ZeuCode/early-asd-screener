// src\components\ui\Button.tsx

import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  secondary:
    "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700 dark:hover:bg-blue-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
};

const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? false;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "rounded font-semibold transition duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          // Si está deshabilitado, fuerza un estilo gris que sobreescriba el del variant
          isDisabled &&
            "bg-gray-300 text-gray-500 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
