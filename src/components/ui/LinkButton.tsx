// src\components\ui\LinkButton.tsx
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md";
}

export default function LinkButton({
  children,
  className,
  size = "sm",
  ...props
}: LinkButtonProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <button
      type="button"
      className={cn(
        "bg-transparent underline text-green-600 hover:text-green-800 transition",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
