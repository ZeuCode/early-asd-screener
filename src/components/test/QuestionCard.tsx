// src\components\test\QuestionCard.tsx
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
  options: Option[];
  onAnswer: (value: number) => void;
};

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  onAnswer,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100;

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
        ></div>
      </div>

      {/* Texto de la pregunta */}
      <p className="text-xl font-semibold text-gray-800 mb-10 max-w-xl">
        {questionText}
      </p>

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
