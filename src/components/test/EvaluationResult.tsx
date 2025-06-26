// src/components/test/EvaluationResult.tsx
type EvaluationResultProps = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
};

export default function EvaluationResult({
  result,
  childName,
}: EvaluationResultProps) {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
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
    </div>
  );
}
