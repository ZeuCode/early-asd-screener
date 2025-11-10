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
import type { FeatureExplanation } from "@/types/feature_explanation";
import { useEffect, useState } from "react";
import api from "@/api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  //LabelList,
  Cell,
} from "recharts";

type Props = {
  result: {
    id: number;
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
  const [explanation, setExplanation] = useState<FeatureExplanation[]>([]);

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

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const res = await api.get(`/evaluations/${result.id}/explanation`);
        if (Array.isArray(res.data)) {
          setExplanation(res.data);
        } else {
          console.warn("Respuesta inesperada del backend:", res.data);
          setExplanation([]);
        }
      } catch (err) {
        console.error("Error al obtener explicación SHAP:", err);
        setExplanation([]); // fallback seguro
      }
    };

    if (result?.id) {
      fetchExplanation();
    }
  }, [result?.id]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6 text-center transition-all">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300">
          Resultado de la Evaluación
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          <span className="font-semibold">Niño/a evaluado(a):</span> {childName}
        </p>

        <div
          className={`rounded-xl border-2 p-6 ${riskStyle.bg} ${riskStyle.border} space-y-4 transition-all`}
        >
          <RiskBadge level={riskLevel} />
          <p className={`text-lg font-semibold ${riskStyle.text}`}>
            {riskMessage}
          </p>
          <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            <span className="font-semibold">Confianza del modelo:</span>{" "}
            {confidence}%
          </p>
        </div>

        {Array.isArray(explanation) && explanation.length > 0 && (
          <div className="mt-8 text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              ¿Qué preguntas influyeron más en el resultado?
            </h3>

            {/* EXPLANATION: fondo único (funciona en claro y oscuro) */}
            <div className="bg-slate-700 text-slate-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  layout="vertical"
                  data={explanation
                    .sort(
                      (a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value)
                    )
                    .map((item) => ({
                      name: item.question_text,
                      impacto: Math.abs(item.shap_value * 100),
                      color: item.shap_value > 0 ? "#dc2626" : "#16a34a",
                      respuesta: item.value === 1 ? "Sí" : "No",
                    }))}
                  margin={{ left: 50 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={300}
                    tick={{
                      fontSize: 12,
                      fill: "#e6eef6", // texto claro para buena legibilidad sobre bg-slate-700
                    }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      color: "#f9fafb",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value) =>
                      typeof value === "number" ? `${value.toFixed(1)}%` : ""
                    }
                    labelFormatter={(label) => `Pregunta: ${label}`}
                  />
                  <Bar
                    dataKey="impacto"
                    isAnimationActive={false}
                    label={{
                      position: "right",
                      formatter: (val: any) =>
                        typeof val === "number" ? `${val.toFixed(1)}%` : "",
                      fill: "#e6eef6", // texto claro para los labels del final de barra
                      fontSize: 12,
                    }}
                  >
                    {explanation
                      .sort(
                        (a, b) =>
                          Math.abs(b.shap_value) - Math.abs(a.shap_value)
                      )
                      .map((item, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={item.shap_value > 0 ? "#dc2626" : "#16a34a"}
                        />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Las barras muestran qué tanto influyó cada pregunta en el
              resultado. Las respuestas en{" "}
              <span className="text-red-600 dark:text-red-400 font-semibold">
                rojo
              </span>{" "}
              aumentan el riesgo, las
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {" "}
                verdes
              </span>{" "}
              lo reducen.
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4 pt-4">
          <Button
            onClick={handleDownloadPDF}
            variant="primary"
            size="sm"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white px-4 py-2 shadow"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </Button>

          <Button
            onClick={() => navigate("/children")}
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
