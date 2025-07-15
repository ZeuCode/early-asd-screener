// src\types\evaluation.ts
export interface Evaluation {
  id: number;
  child_id: number;
  score: number;
  ml_result: number | null;
  ml_probability: number | null;
  created_at: string; // ISO string que llega del backend
}
