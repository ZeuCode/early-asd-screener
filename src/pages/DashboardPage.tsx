// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";

type DashboardSummary = {
  children_count: number;
  evaluations_count: number;
  latest_evaluation: {
    ml_result: number | null;
    ml_probability: number | null;
    created_at: string;
  } | null;
};

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ejecutar ambas peticiones en paralelo
        const [summaryRes, profileRes] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/users/me"),
        ]);

        setSummary(summaryRes.data);
        setUserName(profileRes.data.full_name); // ← nombre real desde backend
      } catch (err) {
        console.error(err);
        showToast("Error al cargar datos del dashboard.", "error");
      }
    };

    fetchData();
  }, [showToast]);

  return (
    <div className="h-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenido{userName ? `, ${userName}` : ""} 👋
        </h2>
        <p className="text-gray-600">
          Aquí puedes ver un resumen de tu actividad reciente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Hijos registrados */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-700 text-sm">Hijos registrados:</p>
          <h3 className="text-xl font-semibold text-green-600">
            {summary ? summary.children_count : "—"}
          </h3>
        </div>

        {/* Evaluaciones realizadas */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-700 text-sm">Evaluaciones realizadas:</p>
          <h3 className="text-xl font-semibold text-green-600">
            {summary ? summary.evaluations_count : "—"}
          </h3>
        </div>

        {/* Última evaluación */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-700 text-sm">Último resultado:</p>
          {summary?.latest_evaluation ? (
            <div className="space-y-1">
              <p className="text-green-700 font-medium">
                {summary.latest_evaluation.ml_result === 1
                  ? "Positivo (riesgo)"
                  : "Negativo"}
              </p>
              <p className="text-sm text-gray-600">
                Probabilidad:{" "}
                {summary.latest_evaluation.ml_probability !== null
                  ? `${(summary.latest_evaluation.ml_probability * 100).toFixed(
                      1
                    )}%`
                  : "—"}
              </p>
              <p className="text-sm text-gray-600">
                Fecha:{" "}
                {new Date(
                  summary.latest_evaluation.created_at
                ).toLocaleDateString("es-PE")}
              </p>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-gray-400">—</h3>
          )}
        </div>
      </div>
    </div>
  );
}
