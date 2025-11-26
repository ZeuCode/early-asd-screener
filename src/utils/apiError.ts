export function getApiErrorMessage(
  error: any,
  defaultMessage: string = "Ocurrió un error inesperado."
): string {
  let message = defaultMessage;

  // Verifica si el backend envió un detalle de error
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;

    if (typeof detail === "string") {
      message = detail;
    } else if (Array.isArray(detail) && detail[0]?.msg) {
      // Limpia el mensaje si viene de Pydantic (Value error, ...)
      message = detail[0].msg.replace(/^Value error, /, "");
    }
  }

  return message;
}
