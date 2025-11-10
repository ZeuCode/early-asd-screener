// src\components\auth\ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { ThemeProvider } from "@/context/ThemeContext";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token"); // limpia tokens expirados o corruptos
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
