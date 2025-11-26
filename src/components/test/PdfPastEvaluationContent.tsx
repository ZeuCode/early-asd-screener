// src/components/test/PdfPastEvaluationContent.tsx
import PdfReportLayout from "./PdfReportLayout";

type Props = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
  answers: {
    question_text: string;
    position: number;
    answer_text: string;
  }[];
  date: string;
};

export default function PdfPastEvaluationContent({
  result,
  childName,
  answers,
  date,
}: Readonly<Props>) {
  return (
    <PdfReportLayout result={result} childName={childName} date={date}>
      {answers.map((a) => (
        <div key={a.position} style={{ marginBottom: "10px" }}>
          <p>
            <strong>
              {a.position}. {a.question_text}
            </strong>
            <br />
            Respuesta: {a.answer_text}
          </p>
        </div>
      ))}
    </PdfReportLayout>
  );
}
