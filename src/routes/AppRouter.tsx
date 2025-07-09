// src\routes\AppRouter.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import { Routes, Route, Navigate } from "react-router";
import Layout from "@/layout/Layout";

// Páginas públicas
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";

// Páginas privadas
import DashboardPage from "@/pages/DashboardPage";
import ChildrenPage from "@/pages/ChildrenPage";
import AddChildPage from "@/pages/AddChildPage";
import GuidePage from "@/pages/GuidePage";
import Qchat10Intro from "@/components/test/Qchat10Intro";
import Qchat10Test from "@/components/test/Qchat10Test";
import ChildEvaluationsPage from "@/pages/ChildEvaluationsPage";

const NotFoundPage = () => <div className="p-6">Página no encontrada</div>;
export default function AppRouter() {
  return (
    <Routes>
      {/* Redirección raíz */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Páginas públicas SOLO si no hay sesión */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Resto de rutas privadas (ya protegidas) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/children/add" element={<AddChildPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route
            path="/evaluation/qchat10/:childId"
            element={<Qchat10Intro />}
          />
          <Route
            path="/evaluation/qchat10/test/:childId"
            element={<Qchat10Test />}
          />
          <Route
            path="/children/:childId/evaluations"
            element={<ChildEvaluationsPage />}
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
