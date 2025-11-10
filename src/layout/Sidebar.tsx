// src\layout\Sidebar.tsx
// import { useNavigate, useLocation } from "react-router";
// import { Home, Users, LogOut, User, HelpCircle } from "lucide-react";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { label: "Inicio", icon: <Home size={20} />, path: "/dashboard" },
//     { label: "Hijos", icon: <Users size={20} />, path: "/children" },
//     // { label: "Guía", icon: <BookOpen size={20} />, path: "/guide" },
//     { label: "Ayuda", icon: <HelpCircle size={20} />, path: "/help" },
//     { label: "Perfil", icon: <User size={20} />, path: "/profile" },
//     /* {
//       label: "Preguntas Frecuentes",
//       icon: <BookOpen size={20} />,
//       path: "/faq",
//     }, */
//   ];
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_name");
//     navigate("/login");
//   };

//   return (
//     <div className="w-full h-screen flex flex-col bg-white">
//       {/* Título */}
//       <div className="px-6 py-5 border-b shrink-0">
//         <h1 className="text-2xl font-bold text-green-600">
//           Early ASD Screener
//         </h1>
//       </div>

//       {/* Menú con scroll independiente */}
//       <nav className="flex-1 overflow-y-auto">
//         <div className="mt-4 space-y-1">
//           {menuItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition
//                 ${
//                   location.pathname === item.path
//                     ? "bg-green-100 text-green-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* Logout siempre abajo */}
//       <div className="px-6 py-4 border-t shrink-0">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 text-red-600 hover:text-red-700 transition text-sm"
//         >
//           <LogOut size={20} />
//           Cerrar sesión
//         </button>
//       </div>
//     </div>
//   );
// }

// src/layout/Sidebar.tsx
import { useNavigate, useLocation } from "react-router";
import { Home, Users, LogOut, User, HelpCircle } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Inicio", icon: <Home size={20} />, path: "/dashboard" },
    { label: "Hijos", icon: <Users size={20} />, path: "/children" },
    { label: "Ayuda", icon: <HelpCircle size={20} />, path: "/help" },
    { label: "Perfil", icon: <User size={20} />, path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Título */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
          Early ASD Screener
        </h1>
      </div>

      {/* Menú con scroll independiente */}
      <nav className="flex-1 overflow-y-auto">
        <div className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout siempre abajo */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition text-sm"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
