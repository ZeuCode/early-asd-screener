// src\types\question.ts
import type { Option } from "@/types/option";
export type Question = {
  id: number;
  position: number;
  text: string;
  options: Option[];
};
