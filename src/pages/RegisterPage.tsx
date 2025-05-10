import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular registro
    alert("Cuenta creada. Ahora inicia sesión.");
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Crear cuenta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
