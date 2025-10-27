/* // src\components\auth\ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
 */

import { Navigate, Outlet } from "react-router";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
