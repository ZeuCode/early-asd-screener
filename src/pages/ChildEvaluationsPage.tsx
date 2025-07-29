// src\pages\ChildEvaluationsPage.tsx

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { Evaluation } from "@/types/evaluation";
import type { ChildResume } from "@/types/child";
import EvaluationSummaryCard from "@/components/evaluation/EvaluationSummaryCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ChildEvaluationsPage() {
  const { childId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [childName, setChildName] = useState(state?.childName || "Niño/a");
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childRes = await api.get<ChildResume>(`/children/${childId}`);
        setChildName(childRes.data.full_name);

        const evalRes = await api.get<Evaluation[]>(`/evaluations/${childId}`);
        const sorted = evalRes.data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setEvaluations(sorted);
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404) {
          showToast("El niño/a ya no existe o fue eliminado.", "error");
          navigate("/children", { replace: true });
          return;
        }
        showToast("Error al cargar las evaluaciones.", "error");
        console.error("Error inesperado:", err);
      }
    };

    fetchData();
  }, [childId, showToast, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          Evaluaciones de {childName}
        </h1>

        <Button
          onClick={() => navigate("/children")}
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-2 px-3 py-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
      </div>

      {evaluations.length === 0 ? (
        <p className="text-gray-600">No hay evaluaciones registradas.</p>
      ) : (
        <div className="space-y-4">
          {evaluations.map((ev) => (
            <EvaluationSummaryCard key={ev.id} evaluation={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
