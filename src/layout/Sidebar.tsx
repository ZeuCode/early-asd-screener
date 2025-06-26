// src\layout\Sidebar.tsx
import { useNavigate, useLocation } from "react-router";
import { Home, Users, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Inicio", icon: <Home size={20} />, path: "/dashboard" },
    { label: "Hijos", icon: <Users size={20} />, path: "/children" },
    { label: "Guía", icon: <BookOpen size={20} />, path: "/guide" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* Título */}
      <div className="px-6 py-5 border-b shrink-0">
        <h1 className="text-2xl font-bold text-green-600">
          Early ASD Screener
        </h1>
      </div>

      {/* Menú con scroll independiente */}
      <nav className="flex-1 overflow-y-auto">
        <div className="mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition 
                ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Logout siempre abajo */}
      <div className="px-6 py-4 border-t shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition text-sm"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
