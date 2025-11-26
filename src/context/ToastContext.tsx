import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
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

  // 1. SOLUCIÓN: Extraemos la función de eliminar para reducir el anidamiento (Nesting Depth)
  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", durationMs = 5000) => {
      setToasts((prevToasts) => {
        // Lógica de validación simplificada
        const isDuplicate =
          prevToasts.length > 0 &&
          prevToasts[prevToasts.length - 1].message === message;

        if (isDuplicate || prevToasts.length >= MAX_TOASTS) {
          return prevToasts;
        }

        const id = Date.now() + Math.random();
        const newToast: Toast = { id, message, type };

        // 2. SOLUCIÓN: Llamamos a la función extraída en lugar de definirla aquí dentro
        setTimeout(() => removeToast(id), durationMs);

        return [...prevToasts, newToast];
      });
    },
    [removeToast] // Agregamos removeToast como dependencia
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600";
      case "error":
        return "bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-600";
      default: // info
        return "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600";
    }
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[240px] max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-fadeIn text-center border transition-colors duration-300 ${getToastStyles(
              toast.type
            )}`}
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
