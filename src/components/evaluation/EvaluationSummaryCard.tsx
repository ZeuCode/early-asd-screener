// src\components\evaluation\EvaluationSummaryCard.tsx
import type { Evaluation } from "@/types/evaluation";
import { getRiskLevel, getRiskStyle } from "@/utils/riskLevel";
import { useNavigate } from "react-router";
import { Calendar, ShieldAlert, Activity } from "lucide-react";

type Props = {
  evaluation: Evaluation;
};

export default function EvaluationSummaryCard({ evaluation }: Props) {
  const navigate = useNavigate();
  const riskLevel = getRiskLevel(evaluation.ml_probability ?? 0);
  const riskStyle = getRiskStyle(riskLevel);
  const predictedProbability =
    evaluation.ml_result === 1
      ? evaluation.ml_probability ?? 0
      : 1 - (evaluation.ml_probability ?? 0);
  const confidence = (predictedProbability * 100).toFixed(1);

  const formattedDate = new Date(evaluation.created_at).toLocaleDateString(
    "es-PE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <div
      onClick={() => navigate(`/evaluations/${evaluation.id}`)}
      className={`cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md hover:brightness-110 transition-all duration-300 ${riskStyle.bg} ${riskStyle.border}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Fecha</p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${riskStyle.text}`} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nivel de riesgo
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {riskLevel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Confianza del modelo
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {confidence}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
