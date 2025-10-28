// src\context\AuthContext.tsx
/* import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api, { setAuthToken } from "@/api/axios";
import { useTheme } from "./ThemeContext";
import type { UserProfile } from "@/types/user";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
      if (res.data.theme_preference) {
        setTheme(res.data.theme_preference);
        localStorage.setItem("theme", res.data.theme_preference);
      }
      // Guarda nombre si quieres:
      localStorage.setItem("user_name", res.data.full_name);
    } catch (err) {
      setUser(null);
      // Si recibes 401, podrías borrar token aquí
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (token: string) => {
    // centraliza lo que antes hacías en LoginPage
    localStorage.setItem("token", token);
    setAuthToken(token);
    // fetchUser aplicará tema desde DB
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    // opcional: restaurar theme al guardado en localStorage o al default
    // setTheme("light");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
 */
