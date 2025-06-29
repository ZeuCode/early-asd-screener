// src\components\test\EvaluationResult.tsx
// import {
//   getRiskLevel,
//   getRiskMessage,
//   getRiskDescription,
//   getRiskStyle,
//   type RiskLevel,
// } from "@/utils/riskLevel";
// import RiskBadge from "@/components/ui/RiskBadge";
// import { FileDown, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router";

// type EvaluationResultProps = {
//   result: {
//     score: number;
//     ml_result: number;
//     ml_probability: number;
//   };
//   childName: string;
// };

// export default function EvaluationResult({
//   result,
//   childName,
// }: EvaluationResultProps) {
//   const navigate = useNavigate();

//   const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
//   const riskMessage = getRiskMessage(riskLevel);
//   const riskDescription = getRiskDescription(riskLevel);
//   const riskStyle = getRiskStyle(riskLevel);

//   const predictedProbability =
//     result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
//   const confidence = (predictedProbability * 100).toFixed(1);

//   return (
//     <div className="flex items-center justify-center h-full bg-gray-50 px-4">
//       <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center space-y-6">
//         <h2 className="text-3xl font-bold text-blue-900">
//           Resultado de la Evaluación
//         </h2>

//         <p className="text-gray-700 text-lg">
//           <span className="font-semibold">Niño/a evaluado(a):</span> {childName}
//         </p>

//         <div
//           className={`rounded-xl border-2 p-6 space-y-4 ${riskStyle.bg} ${riskStyle.border}`}
//         >
//           <RiskBadge level={riskLevel} />

//           <p className={`text-lg font-semibold ${riskStyle.text}`}>
//             {riskMessage}
//           </p>
//           <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>
//         </div>

//         <p className="text-gray-700 text-base">
//           <span className="font-semibold">Confianza del modelo:</span>{" "}
//           {confidence}%
//         </p>

//         {/* <p className="text-gray-500 text-sm italic">
//           📄 Puntaje tradicional del cuestionario Q-CHAT-10:{" "}
//           <span className="font-medium">{result.score}</span>
//         </p> */}

//         <div className="flex justify-center gap-4 pt-4">
//           <button
//             onClick={() => {
//               console.log("Descargar PDF");
//               // Aquí se puede integrar lógica con `jsPDF` o `react-to-pdf`
//             }}
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
//           >
//             <FileDown className="w-4 h-4" />
//             Descargar PDF
//           </button>

//           <button
//             onClick={() => navigate("/children")}
//             className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Volver
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import type { Question } from "@/types/question";

type EvaluationResultProps = {
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
}: EvaluationResultProps) {
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);

  const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const riskStyle = getRiskStyle(riskLevel);

  const predictedProbability =
    result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
  const confidence = (predictedProbability * 100).toFixed(1);

  const handleDownloadPDF = () => {
    if (resultRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: `Evaluacion-${childName}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(resultRef.current)
        .save();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div ref={resultRef} className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center">
            Evaluación completada
          </h2>

          <div className="space-y-4">
            {questions.map((q) => {
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
                    {q.text}
                  </p>
                  <p className="mt-1 text-blue-600 font-semibold">
                    Respuesta: {selectedOption?.text || "Sin respuesta"}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className={`rounded-xl border-2 p-6 ${riskStyle.bg} ${riskStyle.border} space-y-4 mt-10`}
          >
            <h3 className="text-2xl font-bold text-center text-gray-900">
              Resultado de la Evaluación
            </h3>

            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Niño/a evaluado(a):</span>{" "}
              {childName}
            </p>

            <RiskBadge level={riskLevel} />

            <p className={`text-lg font-semibold ${riskStyle.text}`}>
              {riskMessage}
            </p>
            <p className={`text-sm ${riskStyle.text}`}>{riskDescription}</p>

            <p className="text-gray-700 text-base">
              <span className="font-semibold">Confianza del modelo:</span>{" "}
              {confidence}%
            </p>

            <p className="text-gray-700 text-sm italic">
              Puntaje tradicional del cuestionario Q-CHAT-10: {result.score}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
          >
            <FileDown className="w-4 h-4" /> Descargar PDF
          </button>

          <button
            onClick={() => navigate("/children")}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>
      </div>
    </div>
  );
}
