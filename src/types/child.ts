// src\types\child.ts

import type { Gender } from "@/types/gender";

export interface ChildResume {
  id: number;
  full_name: string;
  age_in_months: number;
}

export interface ChildDetails extends ChildResume {
  birth_date: string;
  family_asd: boolean;
  gender: Gender;
  created_at: string;
  updated_at: string;
}
