// src\types\user

export interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  consent_given_at: string;
  updated_at: string;
  theme_preference: "light" | "dark";
}
