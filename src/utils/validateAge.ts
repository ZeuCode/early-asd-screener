export function isValidAgeInMonths(dateOfBirth: Date): boolean {
  const now = new Date();
  const months =
    (now.getFullYear() - dateOfBirth.getFullYear()) * 12 +
    (now.getMonth() - dateOfBirth.getMonth());
  return months >= 16 && months <= 30;
}
