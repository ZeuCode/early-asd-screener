// src\components\test\Qchat10Intro.tsx
import { useParams, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { LocationState } from "@/types/navigation";
import api from "@/api/axios";
import { Button } from "../ui/Button";

export default function Qchat10Intro() {
  const { childId } = useParams();
  const { state } = useLocation() as { state?: LocationState };
  const navigate = useNavigate();

  const [eligible, setEligible] = useState<boolean | null>(null); // null = cargando
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const validateStart = async () => {
      try {
        await api.get(`/evaluations/start/${childId}`);
        setEligible(true);
      } catch (err: any) {
        const msg =
          err?.response?.data?.detail ||
          "No se pudo validar el inicio de la evaluación.";
        setErrorMessage(msg);
        setEligible(false);
      }
    };

    validateStart();
  }, [childId]);

  return (
    <div className="h-full flex justify-center items-center px-4">
      <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Evaluación Q-CHAT-10: Introducción
        </h1>

        <div className="space-y-4 text-base text-justify">
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
            ⚠️ Importante: Esta evaluación no reemplaza un diagnóstico clínico.
            Es una herramienta de tamizaje. Ante cualquier duda, consulta con un
            especialista en desarrollo infantil.
          </p>

          {eligible === false && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded border border-red-300">
              <p className="font-semibold">
                No se puede iniciar la evaluación:
              </p>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() =>
              navigate(`/evaluation/qchat10/test/${childId}`, {
                state,
              })
            }
            disabled={!eligible}
            size="lg"
          >
            Comenzar evaluación
          </Button>
        </div>
      </div>
    </div>
  );
}
