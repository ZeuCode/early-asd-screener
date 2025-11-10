// src\components\test\ReviewAnswers.tsx

import type { Question } from "@/types/question";
import LinkButton from "../ui/LinkButton";
import { Button } from "../ui/Button";

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
      <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
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
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Pregunta {q.position}
              </div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                {q.question_text}
              </p>
              <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">
                Respuesta: {selectedOption?.text || "Sin respuesta"}
              </p>

              <LinkButton
                onClick={() => onEdit(index)}
                className="mt-3 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Editar respuesta
              </LinkButton>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button
          onClick={onSubmit}
          variant="primary"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white"
        >
          Enviar evaluación
        </Button>
      </div>
    </div>
  );
}
