// src\context\ToastContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const MAX_TOASTS = 3;

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: ToastType = "info",
    durationMs = 5000
  ) => {
    if (toasts.length > 0 && toasts[toasts.length - 1].message === message)
      return;
    if (toasts.length >= MAX_TOASTS) return;

    const id = Date.now() + Math.random();
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, durationMs);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Contenedor superior centrado */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[240px] max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-fadeIn text-center border transition-colors duration-300
              ${
                toast.type === "success"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600"
                  : toast.type === "error"
                  ? "bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
}
