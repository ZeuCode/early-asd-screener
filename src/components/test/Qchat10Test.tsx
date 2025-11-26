// src\components\test\Qchat10Test.tsx
// src/components/test/Qchat10Test.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { LocationState } from "@/types/navigation";
import QuestionCard from "./QuestionCard";
import type { Question } from "@/types/question";
import ReviewAnswers from "./ReviewAnswers";
import EvaluationResult from "./EvaluationResult";
import { updateAnswerList } from "@/utils/qchat";
import type { Answer } from "@/types/qchat";
import { User } from "lucide-react";

export default function Qchat10Test() {
  const { childId } = useParams();
  const { state } = useLocation() as { state?: LocationState };
  const childName = state?.childName || "Niño/a";
  const { showToast } = useToast();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    id: number;
    score: number;
    ml_result: number;
    ml_probability: number;
  } | null>(null);

  const [isReviewing, setIsReviewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewScroll, setReviewScroll] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/qchat10/questions");
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        // SOLUCIÓN: Usamos 'err' registrándolo en la consola.
        // Esto satisface la regla de "Handle the exception".
        console.error("Error al obtener preguntas:", err);
        showToast("Error al cargar preguntas del cuestionario", "error");
      }
    };
    fetchQuestions();
  }, [showToast]);

  const handleAnswer = (value: number) => {
    const question = questions[currentIndex];
    const updatedAnswers = updateAnswerList(answers, question.id, value);
    setAnswers(updatedAnswers);

    if (isEditing) {
      setIsEditing(false);
      setIsReviewing(true);
      setTimeout(() => window.scrollTo(0, reviewScroll), 0);
    } else if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handleEditAnswer = (index: number) => {
    setReviewScroll(window.scrollY);
    setIsEditing(true);
    setIsReviewing(false);
    setCurrentIndex(index);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        child_id: Number(childId),
        answers,
      };
      const res = await api.post("/evaluations/", payload);
      setResult(res.data);
      showToast("Evaluación completada", "success");
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail || "Error al enviar la evaluación";
      showToast(msg, "error");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300 transition-colors">
        Cargando preguntas...
      </p>
    );

  if (result) {
    return (
      <EvaluationResult
        result={result}
        childName={childName}
        questions={questions}
        answers={answers}
      />
    );
  }

  if (isReviewing) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
        <h2 className="text-xl font-semibold text-center mb-4 flex justify-center items-center gap-2 text-gray-900 dark:text-gray-100">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Revisión de respuestas para:{" "}
          <span className="text-blue-600 dark:text-blue-400">{childName}</span>
        </h2>
        <ReviewAnswers
          questions={questions}
          answers={answers}
          onEdit={handleEditAnswer}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-xl font-semibold text-center mb-4 flex justify-center items-center gap-2 text-gray-900 dark:text-gray-100">
        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Respondiendo el cuestionario para:{" "}
        <span className="text-blue-600 dark:text-blue-400">{childName}</span>
      </h2>

      <QuestionCard
        key={currentQuestion.position}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        questionText={currentQuestion.question_text}
        helpText={currentQuestion.help_text}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
