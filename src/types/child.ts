// src\types\child.ts
export type Gender = {
  id: number;
  name: string;
  binary_value: number;
};

export type Child = {
  id: number;
  full_name: string;
  birth_date: string;
  family_asd: boolean;
  gender: Gender;
};
