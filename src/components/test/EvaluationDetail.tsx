// src/components/test/EvaluationDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "@/api/axios";
import html2pdf from "html2pdf.js";
import PdfEvaluationContent from "./PdfEvaluationContent";
import { FileDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import type { Question } from "@/types/question";
import type { Answer } from "@/types/qchat";
import {
  getRiskLevel,
  getRiskMessage,
  getRiskDescription,
  getRiskStyle,
  type RiskLevel,
} from "@/utils/riskLevel";
import RiskBadge from "@/components/ui/RiskBadge";
import ReactDOMServer from "react-dom/server";

type EvaluationData = {
  child_name: string;
  questions: Question[];
  answers: Answer[];
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
};

export default function EvaluationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<EvaluationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const res = await api.get(`/evaluations/detail/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error al obtener evaluación", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvaluation();
  }, [id]);

  const handleDownloadPDF = () => {
    if (!data) return;

    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <PdfEvaluationContent
        result={data.result}
        childName={data.child_name}
        questions={data.questions}
        answers={data.answers}
      />
    );

    const container = document.createElement("div");
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Evaluacion-${data.child_name}.pdf`,
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

  if (loading)
    return <p className="text-center mt-10">Cargando evaluación...</p>;
  if (!data)
    return (
      <p className="text-center mt-10 text-red-600">
        No se encontró la evaluación.
      </p>
    );

  const { child_name, questions, answers, result } = data;

  const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const riskStyle = getRiskStyle(riskLevel);
  const predictedProbability =
    result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
  const confidence = (predictedProbability * 100).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Evaluación pasada de {child_name}
      </h1>

      <div
        className={`rounded-xl border-2 p-6 mb-6 ${riskStyle.bg} ${riskStyle.border} space-y-4`}
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

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Respuestas al cuestionario
      </h2>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const answer = answers.find((a) => a.question_id === q.id);
          const selectedOption = q.options.find(
            (opt) => opt.value === answer?.selected_value
          );

          return (
            <div
              key={q.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="text-sm text-gray-500 mb-1">
                Pregunta {q.position}
              </div>
              <p className="text-base font-medium text-gray-800">
                {q.question_text}
              </p>
              <p className="mt-2 text-blue-600 font-semibold">
                Respuesta: {selectedOption?.text || "Sin respuesta"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
        >
          <FileDown className="w-4 h-4" /> Descargar PDF
        </button>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
