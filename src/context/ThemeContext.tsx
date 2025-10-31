// src/context/ThemeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  //setTheme: (t: Theme) => void;
  setTheme: (t: Theme) => Promise<boolean>;
  toggleTheme: () => void;
  loadUserTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved ?? "light";
  });

  // Aplica la clase "dark" al <html> cuando cambia el tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ✅ Actualiza el estado, el localStorage y el backend al instante
  /* const setTheme = async (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    await updateThemeBackend(t);
  }; */

  const setTheme = async (t: Theme): Promise<boolean> => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    //return await updateThemeBackend(t);
    return true;
  };

  const updateThemeBackend = async (newTheme: Theme): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return true; // No hay token → no hay error, solo no sincroniza

      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/theme`,
        { theme: newTheme },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return true; // ✅ Éxito
    } catch (error) {
      //console.error("Error al sincronizar el tema:", error);
      return false; // ❌ Error
    }
  };

  // Alternar entre light/dark
  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Cargar el tema del usuario autenticado
  const loadUserTheme = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me/theme`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userTheme = res.data?.theme as Theme;
      if (userTheme) {
        setTheme(userTheme);
      }
    } catch (error) {
      console.error("Error al cargar el tema del usuario:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, loadUserTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
