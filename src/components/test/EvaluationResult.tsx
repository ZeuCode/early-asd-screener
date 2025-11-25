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

  // Función para truncar texto largo en móvil
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Preparar datos para el gráfico con texto truncado para móvil
  const chartData = explanation
    .sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value))
    .map((item) => ({
      name: item.question_text,
      shortName: truncateText(item.question_text, 60), // Para móvil
      impacto: Math.abs(item.shap_value * 100),
      color: item.shap_value > 0 ? "#dc2626" : "#16a34a",
      respuesta: item.value === 1 ? "Sí" : "No",
      shap_value: item.shap_value,
    }));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 text-center transition-all">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-300">
          Resultado de la Evaluación
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
          <span className="font-semibold">Niño/a evaluado(a):</span> {childName}
        </p>

        <div
          className={`rounded-xl border-2 p-4 sm:p-6 ${riskStyle.bg} ${riskStyle.border} space-y-4 transition-all`}
        >
          <RiskBadge level={riskLevel} />
          <p className={`text-lg font-semibold ${riskStyle.text}`}>
            {riskMessage}
          </p>
          <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <span className="font-semibold">
              Probabilidad estimada de riesgo:
            </span>{" "}
            {confidence}%
          </p>
        </div>

        {Array.isArray(explanation) && explanation.length > 0 && (
          <div className="mt-6 sm:mt-8 text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              ¿Qué preguntas influyeron más en el resultado?
            </h3>

            {/* Gráfico para escritorio */}
            <div className="hidden md:block bg-slate-700 text-slate-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ left: 50, right: 20 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fill: "#e6eef6", fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={300}
                    tick={{
                      fontSize: 12,
                      fill: "#e6eef6",
                    }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      color: "#f9fafb",
                      borderRadius: "0.5rem",
                      fontSize: "14px",
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
                      fill: "#e6eef6",
                      fontSize: 12,
                    }}
                  >
                    {chartData.map((item, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={item.shap_value > 0 ? "#dc2626" : "#16a34a"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico para tablet */}
            <div className="hidden sm:block md:hidden bg-slate-700 text-slate-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ left: 40, right: 20 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fill: "#e6eef6", fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={200}
                    tick={{
                      fontSize: 11,
                      fill: "#e6eef6",
                    }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      color: "#f9fafb",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
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
                      fill: "#e6eef6",
                      fontSize: 11,
                    }}
                  >
                    {chartData.map((item, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={item.shap_value > 0 ? "#dc2626" : "#16a34a"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lista para móvil */}
            <div className="sm:hidden bg-slate-700 text-slate-100 p-4 rounded-xl">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-600 rounded-lg p-3 border-l-4"
                    style={{
                      borderLeftColor:
                        item.shap_value > 0 ? "#dc2626" : "#16a34a",
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      {/* <span className="text-xs text-slate-300 bg-slate-500 px-2 py-1 rounded">
                        {item.respuesta}
                      </span> */}
                      <span className="text-sm font-semibold text-white">
                        {item.impacto.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-100">{item.shortName}</p>
                    <div className="flex items-center mt-2">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            item.shap_value > 0 ? "#dc2626" : "#16a34a",
                        }}
                      ></div>
                      <span className="text-xs text-slate-300">
                        {item.shap_value > 0
                          ? "Aumenta el riesgo"
                          : "Reduce el riesgo"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              {/* Texto para móvil */}
              <p className="sm:hidden text-sm text-gray-600 dark:text-gray-400 text-center">
                Cada tarjeta muestra una pregunta y cómo influyó en el
                resultado. Las respuestas marcadas en{" "}
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  rojo
                </span>{" "}
                aumentan el riesgo, las{" "}
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  verdes
                </span>{" "}
                lo reducen. El porcentaje indica la intensidad de la influencia.
              </p>

              {/* Texto para escritorio/tablet */}
              <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                Las barras muestran qué tanto influyó cada pregunta en el
                resultado. Las respuestas en{" "}
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  rojo
                </span>{" "}
                aumentan el riesgo, las{" "}
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  verdes
                </span>{" "}
                lo reducen. El porcentaje indica la intensidad de la influencia.
              </p>
            </div>
          </div>
        )}

        {/* 💬 INVITACIÓN A ENCUESTA */}
        <div className="mt-8 text-center bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            ¡Tu opinión es muy importante para nosotros! 💚
          </h3>
          <p className="text-sm sm:text-base mb-4">
            Por favor, apóyanos completando esta breve encuesta sobre tu
            experiencia con la aplicación.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf3yUfTi-1vCf_ETJTz3AfRhv6XnCXX_2k1MAsa2mL0qkF3ZA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-green-50 transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            👉 Ir a la encuesta
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
          <Button
            onClick={handleDownloadPDF}
            variant="primary"
            size="sm"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white px-4 py-2 shadow w-full sm:w-auto"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </Button>

          <Button
            onClick={() => navigate("/children")}
            className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white w-full sm:w-auto"
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
