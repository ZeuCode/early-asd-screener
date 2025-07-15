// src\types\dashboard.ts
export type DashboardSummary = {
  children_count: number;
  evaluations_count: number;
  latest_evaluation: {
    ml_result: number | null;
    ml_probability: number | null;
    created_at: string;
  } | null;
};
