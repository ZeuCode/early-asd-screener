// src\components\test\Qchat10Intro.tsx
import type { LocationState } from "@/types/navigation";
import { useParams, useNavigate, useLocation } from "react-router";

export default function Qchat10Intro() {
  const { childId } = useParams();
  const { state } = useLocation() as { state?: LocationState };
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Evaluación Q-CHAT-10: Introducción
      </h1>

      <div className="space-y-4 text-base">
        <p>
          El <strong>Q-CHAT-10</strong> es un cuestionario breve compuesto por
          10 preguntas que permite detectar posibles señales tempranas del
          Trastorno del Espectro Autista (TEA) en niños pequeños.
        </p>

        <p>
          Esta evaluación está dirigida a{" "}
          <strong>padres o cuidadores de niños entre 12 y 36 meses</strong>.
        </p>

        <p>
          <strong>Duración estimada:</strong> 3 a 5 minutos.
        </p>

        <p>
          Responde cada pregunta de forma sincera, basándote en el
          comportamiento habitual de tu hijo/a. No hay respuestas correctas o
          incorrectas.
        </p>

        <p className="text-red-600 font-medium">
          ⚠️ Importante: Esta evaluación no reemplaza un diagnóstico clínico. Es
          una herramienta de tamizaje. Ante cualquier duda, consulta con un
          especialista en desarrollo infantil.
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/evaluation/qchat10/test/${childId}`, {
            state,
          })
        }
        className="mt-8 bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-3 rounded transition"
      >
        Comenzar evaluación
      </button>
    </div>
  );
}
