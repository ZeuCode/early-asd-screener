// src/utils/validateAge.ts
export function isValidAgeInMonths(dateOfBirth: Date): boolean {
  const now = new Date();

  let months =
    (now.getFullYear() - dateOfBirth.getFullYear()) * 12 +
    (now.getMonth() - dateOfBirth.getMonth());

  // Si el día actual es menor que el día de nacimiento, aún no ha cumplido el mes actual
  if (now.getDate() < dateOfBirth.getDate()) {
    months -= 1;
  }

  return months >= 12 && months <= 36;
}
