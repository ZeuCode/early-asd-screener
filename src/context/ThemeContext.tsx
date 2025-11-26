import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import axios from "axios";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => Promise<boolean>;
  toggleTheme: () => void;
  loadUserTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Función auxiliar para inicializar estado (limpia el useState)
const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved ?? "light";
};

// Función auxiliar para actualizar backend (extraída para ser estable y pura)
const updateThemeBackend = async (newTheme: Theme): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return true;

    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/me/theme`,
      { theme: newTheme },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return true; // ✅ Éxito
  } catch (error) {
    // 2. SOLUCIÓN: Manejar la excepción (logging)
    console.error("Error al sincronizar tema con backend:", error);
    return false; // ❌ Error
  }
};

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  // 1. SOLUCIÓN: Inicialización limpia del useState
  const [themeState, setThemeState] = useState<Theme>(getInitialTheme);

  // Aplica la clase "dark" al <html> cuando cambia el tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeState === "dark");
  }, [themeState]);

  // Usamos useCallback para estabilizar las funciones
  const setTheme = useCallback(async (t: Theme): Promise<boolean> => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    return await updateThemeBackend(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      // Actualizamos localStorage aquí también para consistencia inmediata
      localStorage.setItem("theme", newTheme);
      // Intentamos actualizar backend en "background" (sin await para no bloquear UI)
      updateThemeBackend(newTheme);
      return newTheme;
    });
  }, []);

  const loadUserTheme = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me/theme`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userTheme = res.data?.theme as Theme;
      if (userTheme) {
        setThemeState(userTheme);
        localStorage.setItem("theme", userTheme);
      }
    } catch (error) {
      console.error("Error al cargar el tema del usuario:", error);
    }
  }, []);

  // 3. SOLUCIÓN: Envolver el valor en useMemo
  const contextValue = useMemo(
    () => ({
      theme: themeState,
      setTheme,
      toggleTheme,
      loadUserTheme,
    }),
    [themeState, setTheme, toggleTheme, loadUserTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
