import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Panel principal</h1>
      <button
        onClick={() => navigate("/children/add")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Registrar hijo
      </button>
      <button
        onClick={logout}
        className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
