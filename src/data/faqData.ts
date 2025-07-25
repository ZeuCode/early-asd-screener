// src/data/faqData.ts
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqList: FaqItem[] = [
  {
    question: "¿Qué es el cuestionario Q-CHAT-10?",
    answer:
      "Es una herramienta breve de tamizaje que ayuda a identificar señales tempranas de autismo en niños pequeños.",
  },
  {
    question: "¿Quién debe responder el cuestionario?",
    answer:
      "Debe ser completado por un padre, madre o cuidador principal que conozca bien al niño.",
  },
  {
    question: "¿El resultado del cuestionario es un diagnóstico?",
    answer:
      "No. El resultado indica riesgo, pero no reemplaza una evaluación clínica profesional.",
  },
  {
    question: "¿Cuánto tiempo toma completarlo?",
    answer: "Menos de 5 minutos. Son solo 10 preguntas fáciles de responder.",
  },
  {
    question: "¿Con qué frecuencia se puede repetir?",
    answer:
      "Se puede repetir si lo considera necesario, especialmente si observa cambios en el comportamiento del niño.",
  },
];
