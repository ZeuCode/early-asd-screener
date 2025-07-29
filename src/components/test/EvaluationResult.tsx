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
import html2pdf from "html2pdf.js";
import PdfEvaluationContent from "./PdfEvaluationContent";
import type { Question } from "@/types/question";
import ReactDOMServer from "react-dom/server";
import { Button } from "../ui/Button";

type Props = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
  questions: Question[];
  answers: { question_id: number; selected_value: number }[];
};

export default function EvaluationResult({
  result,
  childName,
  questions,
  answers,
}: Props) {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <PdfEvaluationContent
        result={result}
        childName={childName}
        questions={questions}
        answers={answers}
        date={new Date().toISOString()} // ✅ Agregamos fecha actual
      />
    );

    const container = document.createElement("div");
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Evaluacion-${childName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(container)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };

  const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const riskStyle = getRiskStyle(riskLevel);
  const predictedProbability =
    result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
  const confidence = (predictedProbability * 100).toFixed(1);

  return (
    <div className="flex items-center justify-center h-full bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-blue-900">
          Resultado de la Evaluación
        </h2>

        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Niño/a evaluado(a):</span> {childName}
        </p>

        <div
          className={`rounded-xl border-2 p-6 ${riskStyle.bg} ${riskStyle.border} space-y-4`}
        >
          <RiskBadge level={riskLevel} />
          <p className={`text-lg font-semibold ${riskStyle.text}`}>
            {riskMessage}
          </p>
          <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>

          <p className="text-gray-700 text-base">
            <span className="font-semibold">Confianza del modelo:</span>{" "}
            {confidence}%
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Button
            onClick={handleDownloadPDF}
            variant="primary"
            size="sm"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shadow"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </Button>

          <Button
            onClick={() => navigate("/children")}
            className="inline-flex items-center gap-2"
            size="sm"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
