// src\components\auth\PublicOnlyRoute.tsx

import { Navigate, Outlet } from "react-router";
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

export default function PublicOnlyRoute() {
  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si el token no es válido o ya expiró, eliminarlo
  localStorage.removeItem("token");
  return <Outlet />;
}
