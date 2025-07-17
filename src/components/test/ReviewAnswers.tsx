// src\components\test\ReviewAnswers.tsx

import type { Question } from "@/types/question";

type ReviewAnswersProps = {
  questions: Question[];
  answers: { question_id: number; selected_value: number }[];
  onEdit: (index: number) => void;
  onSubmit: () => void;
};

export default function ReviewAnswers({
  questions,
  answers,
  onEdit,
  onSubmit,
}: ReviewAnswersProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Revisión de respuestas
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

              <button
                onClick={() => onEdit(index)}
                className="mt-3 text-sm text-green-600 hover:underline"
              >
                Editar respuesta
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-base transition"
        >
          Enviar evaluación
        </button>
      </div>
    </div>
  );
}
