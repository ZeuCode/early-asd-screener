// src/pages/DashboardPage.tsx

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("user_name") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Early ASD Screener</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Bienvenido{userName ? `, ${userName}` : ""} 👋
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Registrar hijo */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Registrar hijo/a
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Agrega a tu hijo o hija para comenzar una evaluación.
            </p>
            <button
              onClick={() => navigate("/children/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Registrar hijo/a
            </button>
          </div>

          {/* Ver hijos y evaluaciones */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Hijos y evaluaciones
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Visualiza tus hijos registrados y su historial de evaluaciones.
            </p>
            <button
              onClick={() => navigate("/children")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
            >
              Ver hijos
            </button>
          </div>

          {/* Nueva evaluación */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Iniciar evaluación
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Comienza una nueva evaluación Q-CHAT-10 para uno de tus hijos.
            </p>
            <button
              onClick={() => navigate("/evaluation/start")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              Iniciar
            </button>
          </div>

          {/* Guía rápida */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Guía rápida
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Aprende cómo registrar hijos y realizar evaluaciones
              correctamente.
            </p>
            <button
              onClick={() => navigate("/guide")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Ver guía
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center text-sm text-gray-600 py-3 mt-auto">
        &copy; {currentYear} Early ASD Screener. Todos los derechos reservados.
      </footer>
    </div>
  );
}
