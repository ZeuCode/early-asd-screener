// src\pages\EvaluationDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { EvaluationDetail } from "@/types/evaluation";
import RiskBadge from "@/components/ui/RiskBadge";
import {
  getRiskLevel,
  getRiskStyle,
  getRiskDescription,
  getRiskMessage,
  type RiskLevel,
} from "@/utils/riskLevel";
import { FileDown, ArrowLeft, Trash2 } from "lucide-react";
import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";
import PdfPastEvaluationContent from "@/components/test/PdfPastEvaluationContent";
import { formatDate } from "@/utils/formatDate";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Button } from "@/components/ui/Button";

export default function EvaluationDetailPage() {
  const { evaluationId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [data, setData] = useState<EvaluationDetail | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // ✅ Nueva bandera

  useEffect(() => {
    if (isDeleted) return; // ✅ Cancelar si ya fue eliminada

    const controller = new AbortController();
    let isMounted = true;

    const fetchEvaluation = async () => {
      try {
        const res = await api.get(`/evaluations/detail/${evaluationId}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(res.data);
        }
      } catch (error: any) {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED")
          return;
        const status = error.response?.status;
        if (status === 404 && isMounted && !isDeleted) {
          showToast("La evaluación no existe o fue eliminada.", "error");
          navigate("/children", { replace: true }); // o a historial si prefieres
        } else {
          showToast("No se pudo cargar la evaluación.", "error");
        }
      }
    };

    fetchEvaluation();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [evaluationId, showToast, navigate, isDeleted]);

  if (!data) return <p className="p-6">Cargando evaluación...</p>;

  const riskLevel: RiskLevel = getRiskLevel(data.ml_probability);
  const riskStyle = getRiskStyle(riskLevel);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const confidence = (
    (data.ml_result === 1 ? data.ml_probability : 1 - data.ml_probability) * 100
  ).toFixed(1);

  const handleDownloadPDF = () => {
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <PdfPastEvaluationContent
        result={{
          score: data.score,
          ml_result: data.ml_result,
          ml_probability: data.ml_probability,
        }}
        childName={data.child.full_name}
        answers={data.answers}
        date={data.created_at}
      />
    );

    const container = document.createElement("div");
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Evaluacion-${data.child.full_name}.pdf`,
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

  const handleDelete = async () => {
    if (!evaluationId) return;
    setIsDeleting(true);
    try {
      await api.delete(`/evaluations/${evaluationId}`);
      setIsDeleted(true); // ✅ Cancelamos futuros fetch
      showToast("Evaluación eliminada con éxito", "success");
      navigate(`/children/${data.child.id}/evaluations`, {
        replace: true,
        state: { childName: data.child.full_name },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Error al eliminar la evaluación";
      showToast(message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          Detalle de Evaluación
        </h1>

        <div className="text-center space-y-1">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Niño/a evaluado(a):</span>{" "}
            {data.child.full_name}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Fecha de evaluación:</span>{" "}
            {formatDate(data.created_at)}
          </p>
        </div>

        <div
          className={`rounded-xl border-2 p-6 ${riskStyle.bg} ${riskStyle.border} space-y-4 text-center`}
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

        <h2 className="text-lg font-bold text-green-700">Respuestas dadas</h2>
        <div className="space-y-4">
          {data.answers.map((a) => (
            <div
              key={a.position}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="text-sm text-gray-500 mb-1">
                Pregunta {a.position}
              </div>
              <p className="text-base font-medium text-gray-800">
                {a.question_text}
              </p>
              <p className="mt-2 text-blue-600 font-semibold">
                Respuesta: {a.answer_text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow"
            size="sm"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="sm"
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div className="flex-1" />

          <Button
            onClick={() => setShowConfirmModal(true)}
            disabled={isDeleting}
            variant="danger"
            size="sm"
            className="inline-flex items-center gap-2 shadow"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar evaluación
          </Button>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          title="Eliminar evaluación"
          message="¿Estás seguro de que deseas eliminar esta evaluación? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            handleDelete();
          }}
        />
      )}
    </div>
  );
}
