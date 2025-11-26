// src\components\test\PdfEvaluationContent.tsx
import type { Question } from "@/types/question";
import PdfReportLayout from "./PdfReportLayout";

type Props = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
  questions: Question[];
  answers: { question_id: number; selected_value: number }[];
  date: string;
};

export default function PdfEvaluationContent({
  result,
  childName,
  questions,
  answers,
  date,
}: Readonly<Props>) {
  return (
    <PdfReportLayout result={result} childName={childName} date={date}>
      {questions.map((q) => {
        const answer = answers.find((a) => a.question_id === q.id);
        const selected = q.options.find(
          (opt) => opt.value === answer?.selected_value
        );
        return (
          <div key={q.id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>
                {q.position}. {q.question_text}
              </strong>
              <br />
              Respuesta: {selected?.text || "Sin respuesta"}
            </p>
          </div>
        );
      })}
    </PdfReportLayout>
  );
}
