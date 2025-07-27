import type { ChildResume } from "./child";

// src\types\evaluation.ts
export interface Evaluation {
  id: number;
  child_id: number;
  score: number;
  ml_result: number | null;
  ml_probability: number | null;
  created_at: string; // ISO string que llega del backend
}

interface QuestionWithAnswer {
  question_text: string;
  position: number;
  answer_text: string;
}

export interface EvaluationDetail {
  id: number;
  child: ChildResume;
  created_at: string;
  score: number;
  ml_result: number;
  ml_probability: number;
  answers: QuestionWithAnswer[];
}
