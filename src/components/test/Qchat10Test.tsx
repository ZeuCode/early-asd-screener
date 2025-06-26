// src\components\test\Qchat10Test.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { LocationState } from "@/types/navigation";

type Option = {
  id: number;
  question_id: number;
  value: number;
  text: string;
};

type Question = {
  id: number;
  position: number;
  text: string;
  options: Option[];
};

export default function Qchat10Test() {
  const { childId } = useParams();
  const { state } = useLocation() as { state?: LocationState };
  const childName = state?.childName || "Niño/a";
  const { showToast } = useToast();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { question_id: number; selected_value: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    score: number;
    ml_result: number;
    ml_probability: number;
  } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/qchat10/questions");
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        showToast("Error al cargar preguntas del cuestionario", "error");
      }
    };
    fetchQuestions();
  }, [showToast]);

  const handleAnswer = (value: number) => {
    const question = questions[currentIndex];
    console.log(`Pregunta ${question.position}: respuesta =`, value);
    setAnswers((prev) => [
      ...prev,
      { question_id: question.id, selected_value: value },
    ]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        child_id: Number(childId),
        answers,
      };
      //eliminar luego
      console.log("Payload enviado al backend:", payload);
      const res = await api.post("/evaluations/", payload);
      console.log("Respuesta del backend:", res.data);
      setResult(res.data);
      showToast("Evaluación completada", "success");
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail || "Error al enviar la evaluación";
      showToast(msg, "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando preguntas...</p>;
  }

  if (result) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Resultado de la evaluación</h2>
        <p>
          <strong>Niño/a:</strong> {childName}
        </p>
        <p className="mt-2">
          <strong>Puntaje:</strong> {result.score}
        </p>
        <p className="mt-2">
          <strong>Resultado ML:</strong>{" "}
          {result.ml_result === 1 ? "Positivo (riesgo)" : "Negativo"}
        </p>
        <p className="mt-2">
          <strong>Probabilidad:</strong>{" "}
          {(result.ml_probability * 100).toFixed(1)}%
        </p>

        <button
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded text-lg"
          onClick={() => window.location.reload()}
        >
          Repetir evaluación
        </button>
      </div>
    );
  }

  if (currentIndex < questions.length) {
    const q = questions[currentIndex];
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Cuestionario aplicado a: {childName}
        </h2>
        <p className="text-lg font-medium mb-6">{q.text}</p>

        <div className="flex gap-6 justify-center">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.value)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Cuestionario completado</h2>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded text-lg"
        onClick={handleSubmit}
      >
        Enviar evaluación
      </button>
    </div>
  );
}
