// src\utils\riskLevel.ts
export type RiskLevel =
  | "Sin riesgo"
  | "Riesgo bajo"
  | "Riesgo medio"
  | "Riesgo alto";

export function getRiskLevel(probability: number): RiskLevel {
  if (probability <= 0.25) return "Sin riesgo";
  if (probability <= 0.5) return "Riesgo bajo";
  if (probability <= 0.75) return "Riesgo medio";
  return "Riesgo alto";
}

export function getRiskMessage(level: RiskLevel): string {
  switch (level) {
    case "Sin riesgo":
      return "No se detectan señales de riesgo.";
    case "Riesgo bajo":
      return "Se detectan señales leves de riesgo. Se sugiere observación.";
    case "Riesgo medio":
      return "Probable riesgo. Recomendamos consultar con un especialista.";
    case "Riesgo alto":
      return "Se detecta alto riesgo. Por favor, acuda a un especialista.";
  }
}

export function getRiskDescription(level: RiskLevel): string {
  switch (level) {
    case "Sin riesgo":
      return "Las respuestas indican que no hay señales relevantes de riesgo. Se recomienda observar regularmente el desarrollo del niño.";
    case "Riesgo bajo":
      return "Hay algunas señales leves que podrían estar relacionadas con riesgo. No es motivo de preocupación inmediata, pero se recomienda seguimiento en las próximas semanas.";
    case "Riesgo medio":
      return "Se detectan señales moderadas de riesgo. Le recomendamos acudir a un especialista para una evaluación clínica.";
    case "Riesgo alto":
      return "Se detectan múltiples señales de riesgo. Acuda a una evaluación profesional lo antes posible para confirmar o descartar cualquier condición.";
  }
}

export function getRiskStyle(level: RiskLevel) {
  switch (level) {
    case "Sin riesgo":
      return {
        bg: "bg-green-100",
        text: "text-green-900",
        border: "border-green-300",
        ring: "ring-green-600",
      };
    case "Riesgo bajo":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-900",
        border: "border-yellow-300",
        ring: "ring-yellow-600",
      };
    case "Riesgo medio":
      return {
        bg: "bg-orange-100",
        text: "text-orange-900",
        border: "border-orange-300",
        ring: "ring-orange-600",
      };
    case "Riesgo alto":
      return {
        bg: "bg-red-100",
        text: "text-red-900",
        border: "border-red-300",
        ring: "ring-red-700",
      };
  }
}
