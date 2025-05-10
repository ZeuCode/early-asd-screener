import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Entrar
        </button>
      </form>
      <div className="mt-3 text-sm">
        <Link to="/register" className="text-blue-600">
          Registrarse
        </Link>{" "}
        |{" "}
        <Link to="/forgot-password" className="text-blue-600">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}
