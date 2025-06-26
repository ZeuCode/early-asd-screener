// src\utils\getAgeInMonths.ts
export function getAgeInMonths(dateOfBirth: Date): number {
  const now = new Date();

  let months =
    (now.getFullYear() - dateOfBirth.getFullYear()) * 12 +
    (now.getMonth() - dateOfBirth.getMonth());

  if (now.getDate() < dateOfBirth.getDate()) {
    months -= 1;
  }

  return months;
}
