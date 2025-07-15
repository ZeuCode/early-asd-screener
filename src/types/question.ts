// src\types\question.ts
import type { Option } from "@/types/option";
export interface Question {
  id: number;
  position: number;
  text: string;
  options: Option[];
}
