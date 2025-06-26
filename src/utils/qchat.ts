// src/utils/qchat.ts

import type { Answer } from "@/types/qchat";

export function updateAnswerList(
  answers: Answer[],
  questionId: number,
  value: number
): Answer[] {
  const updated = [...answers];
  const index = updated.findIndex((a) => a.question_id === questionId);

  if (index !== -1) {
    updated[index] = { question_id: questionId, selected_value: value };
  } else {
    updated.push({ question_id: questionId, selected_value: value });
  }

  return updated;
}
