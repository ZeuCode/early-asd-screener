// src\pages\DashboardPage.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { DashboardSummary } from "@/types/dashboard";
import DashboardCard from "@/components/dashboard/DashboardCard";
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
    <div className="h-full space-y-6 text-gray-800 dark:text-gray-100">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Bienvenido{userName ? `, ${userName}` : ""} 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí puedes ver un resumen de tu actividad reciente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Hijos registrados */}
        <DashboardCard label="Hijos registrados:">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
            {summary ? summary.children_count : "—"}
          </h3>
        </DashboardCard>

        {/* Evaluaciones realizadas */}
        <DashboardCard label="Evaluaciones realizadas:">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
            {summary ? summary.evaluations_count : "—"}
          </h3>
        </DashboardCard>
        {/* Última evaluación */}
        <DashboardCard label="Último resultado:">
          {summary?.latest_evaluation ? (
            <div className="space-y-1">
              <p
                className={`font-medium ${
                  summary.latest_evaluation.ml_result === 1
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-700 dark:text-green-400"
                }`}
              >
                {summary.latest_evaluation.ml_result === 1
                  ? "Positivo (riesgo)"
                  : "Negativo"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Probabilidad:{" "}
                {summary.latest_evaluation.ml_probability !== null
                  ? `${(summary.latest_evaluation.ml_probability * 100).toFixed(
                      1
                    )}%`
                  : "—"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fecha:{" "}
                {new Date(
                  summary.latest_evaluation.created_at
                ).toLocaleDateString("es-PE")}
              </p>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-gray-400 dark:text-gray-500">
              —
            </h3>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
