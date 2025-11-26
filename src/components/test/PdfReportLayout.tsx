// src/components/test/PdfReportLayout.tsx
import type { ReactNode } from "react";
import {
  getRiskLevel,
  getRiskMessage,
  getRiskDescription,
  type RiskLevel,
} from "@/utils/riskLevel";

type Props = {
  result: {
    score: number;
    ml_result: number;
    ml_probability: number;
  };
  childName: string;
  date: string;
  children: ReactNode; // Aquí irán las respuestas específicas de cada caso
};

export default function PdfReportLayout({
  result,
  childName,
  date,
  children,
}: Readonly<Props>) {
  const riskLevel: RiskLevel = getRiskLevel(result.ml_probability);
  const riskMessage = getRiskMessage(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);

  const predictedProbability =
    result.ml_result === 1 ? result.ml_probability : 1 - result.ml_probability;
  const confidence = (predictedProbability * 100).toFixed(1);

  const bgColors: Record<RiskLevel, string> = {
    "Sin riesgo": "#dcfce7",
    "Riesgo bajo": "#fef9c3",
    "Riesgo medio": "#ffedd5",
    "Riesgo alto": "#fee2e2",
  };

  const borderColors: Record<RiskLevel, string> = {
    "Sin riesgo": "#22c55e",
    "Riesgo bajo": "#eab308",
    "Riesgo medio": "#f97316",
    "Riesgo alto": "#ef4444",
  };

  const textColors: Record<RiskLevel, string> = {
    "Sin riesgo": "#166534",
    "Riesgo bajo": "#854d0e",
    "Riesgo medio": "#7c2d12",
    "Riesgo alto": "#991b1b",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#111",
        padding: "20px",
        fontSize: "14px",
      }}
    >
      <h1
        style={{
          fontSize: "22px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Evaluación Q-CHAT-10
      </h1>

      <p style={{ marginBottom: "10px" }}>
        <strong>Niño/a evaluado(a):</strong> {childName}
      </p>

      <p style={{ marginBottom: "20px" }}>
        <strong>Fecha de evaluación:</strong>{" "}
        {new Date(date).toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>

      <h2 style={{ fontSize: "16px", margin: "20px 0 10px" }}>
        Respuestas al cuestionario:
      </h2>

      {/* Aquí se inyecta la parte variable (las preguntas/respuestas) */}
      {children}

      <h2 style={{ fontSize: "16px", marginTop: "30px", textAlign: "center" }}>
        Resultado de la evaluación:
      </h2>

      <div
        style={{
          border: `2px solid ${borderColors[riskLevel]}`,
          backgroundColor: bgColors[riskLevel],
          padding: "20px",
          borderRadius: "12px",
          marginTop: "10px",
          textAlign: "center",
          color: textColors[riskLevel],
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            paddingBottom: "10px",
          }}
        >
          {riskLevel}
        </p>

        <p style={{ fontSize: "16px", fontWeight: "bold" }}>{riskMessage}</p>
        <p style={{ fontSize: "13px", marginBottom: "8px" }}>
          {riskDescription}
        </p>
        <p style={{ fontSize: "13px" }}>
          <strong>Confianza del modelo:</strong> {confidence}%
        </p>
        <p style={{ fontSize: "13px" }}>
          <strong>Puntaje tradicional del cuestionario:</strong> {result.score}
        </p>
      </div>
    </div>
  );
}
