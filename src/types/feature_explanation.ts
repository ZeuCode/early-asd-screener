// src\types\feature_explanation.ts
export interface FeatureExplanation {
  feature: string;
  question_text: string;
  value: number;
  shap_value: number;
}
