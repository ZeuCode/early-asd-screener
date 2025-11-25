// src\utils\formatDate.ts

import { DateTime } from "luxon";

export function formatDate(dateStr: string): string {
  const hasTime = dateStr.includes("T") && dateStr.length > 10;

  const date = hasTime
    ? DateTime.fromISO(dateStr, { zone: "utc" }).setZone("America/Lima")
    : DateTime.fromISO(dateStr, { zone: "America/Lima" }).startOf("day");

  return hasTime
    ? date
        .setLocale("es")
        .toFormat("dd/MM/yyyy, hh:mm a")
        .replace("AM", "a. m.")
        .replace("PM", "p. m.")
    : date.setLocale("es").toFormat("dd/MM/yyyy");
}
