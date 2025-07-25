// src\layout\BottomNav.tsx
import NavItem from "./NavItem";
import { Home, Users, User, HelpCircle } from "lucide-react";

type Props = {
  currentPath: string;
};

export default function BottomNav({ currentPath }: Props) {
  const items = [
    { label: "Inicio", icon: Home, path: "/dashboard" },
    { label: "Hijos", icon: Users, path: "/children" },
    /* { label: "Guía", icon: BookOpen, path: "/guide" },
    { label: "Preguntas", icon: HelpCircle, path: "/faq" }, */
    { label: "Ayuda", icon: HelpCircle, path: "/help" },
    { label: "Perfil", icon: User, path: "/profile" },
  ];

  return (
    <div className="flex justify-around items-center py-2 px-2">
      {items.map(({ label, icon, path }) => (
        <NavItem
          key={path}
          label={label}
          icon={icon}
          path={path}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
}
