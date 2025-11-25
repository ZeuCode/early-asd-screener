// src\routes\AppRouter.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import { Routes, Route, Navigate } from "react-router";
import Layout from "@/layout/Layout";

// Páginas públicas
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Páginas privadas
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ChildrenPage from "@/pages/children/ChildrenPage";
import AddChildPage from "@/pages/children/AddChildPage";
import Qchat10Intro from "@/components/test/Qchat10Intro";
import Qchat10Test from "@/components/test/Qchat10Test";
import ChildEvaluationsPage from "@/pages/children/ChildEvaluationsPage";
import UserProfilePage from "@/pages/user/UserProfilePage";
import ChildDetailPage from "@/pages/children/ChildDetailPage";
import EvaluationDetailPage from "@/pages/evaluation/EvaluationDetailPage";
import HelpPage from "@/pages/help/HelpPage";
import PrivacyPolicyPage from "@/pages/policy/PrivacyPolicyPage";

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
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Resto de rutas privadas (ya protegidas) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/children/:id" element={<ChildDetailPage />} />
          <Route path="/children/add" element={<AddChildPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route
            path="/evaluation/qchat10/:childId"
            element={<Qchat10Intro />}
          />
          <Route
            path="/evaluations/:evaluationId"
            element={<EvaluationDetailPage />}
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
