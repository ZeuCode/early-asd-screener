// src\components\test\EvaluationResult.tsx
import {
  getRiskLevel,
  getRiskMessage,
  getRiskDescription,
  getRiskStyle,
  type RiskLevel,
} from "@/utils/riskLevel";
import RiskBadge from "@/components/ui/RiskBadge";
import { FileDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

type EvaluationResultProps = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
};

export default function EvaluationResult({
  result,
  childName,
}: EvaluationResultProps) {
  const navigate = useNavigate();

  const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const riskStyle = getRiskStyle(riskLevel);

  const predictedProbability =
    result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
  const confidence = (predictedProbability * 100).toFixed(1);

  return (
    <div className="flex items-center justify-center h-full bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-blue-900">
          Resultado de la Evaluación
        </h2>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Niño/a evaluado(a):</span> {childName}
        </p>

        <div
          className={`rounded-xl border-2 p-6 space-y-4 ${riskStyle.bg} ${riskStyle.border}`}
        >
          <RiskBadge level={riskLevel} />

          <p className={`text-lg font-semibold ${riskStyle.text}`}>
            {riskMessage}
          </p>
          <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>
        </div>

        <p className="text-gray-700 text-base">
          <span className="font-semibold">Confianza del modelo:</span>{" "}
          {confidence}%
        </p>

        {/* <p className="text-gray-500 text-sm italic">
          📄 Puntaje tradicional del cuestionario Q-CHAT-10:{" "}
          <span className="font-medium">{result.score}</span>
        </p> */}

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => {
              console.log("Descargar PDF");
              // Aquí se puede integrar lógica con `jsPDF` o `react-to-pdf`
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </button>

          <button
            onClick={() => navigate("/children")}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
