// src\utils\formatDate.ts
// src/utils/formatDate.ts

import { DateTime } from "luxon";

/* 
//SOLUCION SIN LUXON!!! FUNCIONA MUY BIEN
export function formatDate(dateStr: string): string {
  const hasTime = dateStr.includes("T") && dateStr.length > 10;

  let date: Date;

  if (hasTime) {
    // Fecha con hora → puede incluir zona, lo manejamos como está
    date = new Date(dateStr);
  } else {
    // Fecha sin hora → parseo manual robusto y en hora local
    const parts = dateStr.match(/\d+/g);
    if (!parts || parts.length < 3) {
      throw new Error("Formato de fecha no válido");
    }
    const [year, month, day] = parts.map(Number);
    date = new Date(year, month - 1, day); // month: 0-based
  }

  const options: Intl.DateTimeFormatOptions = hasTime
    ? {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Lima",
      }
    : {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Lima",
      };

  const formatter = new Intl.DateTimeFormat("es-PE", options);
  return formatter.format(date);
} */

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

/* import { DateTime } from "luxon";

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
    : date.toFormat("dd/MM/yyyy");
} */

/* import { DateTime } from "luxon";

export function formatDate(dateStr: string): string {
  // Detecta si es solo fecha (sin hora)
  const isDateOnly = dateStr.length === 10;

  // Si es solo fecha, tratamos como fecha local sin conversión de zona horaria
  const date = isDateOnly
    ? DateTime.fromISO(dateStr, { zone: "America/Lima" }).startOf("day")
    : DateTime.fromISO(dateStr, { zone: "utc" }).setZone("America/Lima");

  // Formato según tipo
  return date.toFormat(isDateOnly ? "dd/MM/yyyy" : "dd/MM/yyyy, hh:mm a");
} */

/* export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
} */

/* export function formatDate(
  dateStr: string,
  options?: { withTime?: boolean }
): string {
  const { withTime = true } = options || {};
  const date = new Date(dateStr);

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return new Intl.DateTimeFormat("es-PE", formatOptions).format(date);
}
 */
