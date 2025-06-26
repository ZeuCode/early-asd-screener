// src\layout\Layout.tsx
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar solo en escritorio */}
      <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Contenedor del contenido + scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>

        {/* Bottom nav solo en móvil */}
        <nav className="md:hidden bg-white border-t shadow">
          <BottomNav currentPath={location.pathname} />
        </nav>
      </div>
    </div>
  );
}
