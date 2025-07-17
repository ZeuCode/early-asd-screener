// src\components\test\QuestionCard.tsx
// src/components/test/QuestionCard.tsx
import { useState } from "react";

type Option = {
  id: number;
  question_id: number;
  value: number;
  text: string;
};

type QuestionCardProps = {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  helpText?: string | null;
  options: Option[];
  onAnswer: (value: number) => void;
};

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  helpText,
  options,
  onAnswer,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100;
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => setShowHelp((prev) => !prev);

  return (
    <div className="flex flex-col justify-center items-center h-full p-6 text-center">
      {/* Progreso textual */}
      <div className="mb-2 text-green-700 font-semibold text-base">
        Pregunta {questionNumber} de {totalQuestions}
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-sm h-2 bg-gray-200 rounded-full mb-8">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Texto de la pregunta */}
      <p className="text-xl font-semibold text-gray-800 mb-4 max-w-xl">
        {questionText}
      </p>

      {/* Botón de ayuda y explicación */}
      {helpText && (
        <div className="mb-6">
          <button
            onClick={toggleHelp}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            {showHelp ? "Ocultar ayuda" : "¿Necesitas ayuda?"}
          </button>
          {showHelp && (
            <p className="mt-2 text-sm text-gray-600 italic max-w-md">
              {helpText}
            </p>
          )}
        </div>
      )}

      {/* Opciones */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.value)}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg transition-all"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
