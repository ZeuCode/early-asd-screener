import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import AddChildPage from "./pages/AddChildPage";
import ChildrenPage from "./pages/ChildrenPage";
import EvaluationStartPage from "./pages/EvaluationStartPage";
import GuidePage from "./pages/GuidePage";
import Qchat10Intro from "./components/test/Qchat10Intro";
import Qchat10Test from "./components/test/Qchat10Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/children" element={<ChildrenPage />} />
      <Route path="/children/add" element={<AddChildPage />} />
      <Route path="/evaluation/start" element={<EvaluationStartPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/qchat10" element={<Qchat10Intro />} />
      <Route path="/qchat10/test" element={<Qchat10Test />} />
    </Routes>
  );
}

export default App;
