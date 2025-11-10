// src\layout\BottomNav.tsx
// // src\layout\BottomNav.tsx
// import NavItem from "./NavItem";
// import { Home, Users, User, HelpCircle } from "lucide-react";

// type Props = {
//   currentPath: string;
// };

// export default function BottomNav({ currentPath }: Props) {
//   const items = [
//     { label: "Inicio", icon: Home, path: "/dashboard" },
//     { label: "Hijos", icon: Users, path: "/children" },
//     /* { label: "Guía", icon: BookOpen, path: "/guide" },
//     { label: "Preguntas", icon: HelpCircle, path: "/faq" }, */
//     { label: "Ayuda", icon: HelpCircle, path: "/help" },
//     { label: "Perfil", icon: User, path: "/profile" },
//   ];

//   return (
//     <div className="flex justify-around items-center py-2 px-2">
//       {items.map(({ label, icon, path }) => (
//         <NavItem
//           key={path}
//           label={label}
//           icon={icon}
//           path={path}
//           currentPath={currentPath}
//         />
//       ))}
//     </div>
//   );
// }

// // src/layout/BottomNav.tsx
// import NavItem from "./NavItem";
// import { Home, Users, User, HelpCircle } from "lucide-react";

// type Props = {
//   currentPath: string;
// };

// export default function BottomNav({ currentPath }: Props) {
//   const items = [
//     { label: "Inicio", icon: Home, path: "/dashboard" },
//     { label: "Hijos", icon: Users, path: "/children" },
//     { label: "Ayuda", icon: HelpCircle, path: "/help" },
//     { label: "Perfil", icon: User, path: "/profile" },
//   ];

//   return (
//     <div className="flex justify-around items-center py-2 px-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-md">
//       {items.map(({ label, icon, path }) => (
//         <NavItem
//           key={path}
//           label={label}
//           icon={icon}
//           path={path}
//           currentPath={currentPath}
//         />
//       ))}
//     </div>
//   );
// }

//añadiendo el boton de logout debajo:

// src/layout/BottomNav.tsx
import NavItem from "./NavItem";
import { Home, Users, User, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

type Props = {
  currentPath: string;
};

export default function BottomNav({ currentPath }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const items = [
    { label: "Inicio", icon: Home, path: "/dashboard" },
    { label: "Hijos", icon: Users, path: "/children" },
    { label: "Ayuda", icon: HelpCircle, path: "/help" },
    { label: "Perfil", icon: User, path: "/profile" },
  ];

  return (
    <div className="flex justify-around items-center py-2 px-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-md md:hidden">
      {/* Menú principal */}
      {items.map(({ label, icon, path }) => (
        <NavItem
          key={path}
          label={label}
          icon={icon}
          path={path}
          currentPath={currentPath}
        />
      ))}

      {/* 🔴 Cerrar sesión (solo móvil) */}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
      >
        <LogOut size={20} />
        <span>Salir</span>
      </button>
    </div>
  );
}
