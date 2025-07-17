// src\types\question.ts
import type { Option } from "@/types/question_option";
export interface Question {
  id: number;
  position: number;

  question_text: string;
  help_text: string | null;
  options: Option[];
}
