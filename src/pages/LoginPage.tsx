import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Iniciar sesión - Early ASD Screener";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.correo || !form.password) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: form.correo,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // ✅ Guarda el token
      localStorage.setItem("user_name", data.user.full_name);
      navigate("/dashboard"); // ✅ Redirige al dashboard
    } catch (error) {
      console.error("Login error:", error);
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/images/fondo.jpg)] bg-cover bg-center">
      <div className="p-6 w-full max-w-md bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-center text-green-700 mb-1">
          Early ASD Screener
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Plataforma para la detección temprana del riesgo de autismo en niños
        </p>

        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            required
            value={form.correo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            required
            value={form.password}
            onChange={handleChange}
          />
          <div className="text-right">
            <span
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          >
            Entrar
          </button>
          <p className="text-sm text-center">
            ¿No tienes cuenta?{" "}
            <span
              className="text-green-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
