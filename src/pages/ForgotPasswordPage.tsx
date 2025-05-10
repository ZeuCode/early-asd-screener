export default function ForgotPasswordPage() {
  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Enlace de recuperación enviado (simulado)");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Recuperar contraseña</h1>
      <form onSubmit={handleRecover} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white py-2 rounded">
          Recuperar
        </button>
      </form>
    </div>
  );
}
