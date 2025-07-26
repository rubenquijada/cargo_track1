"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";

type SidebarItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

type BaseLayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  profileURL: string;
};

export function BaseLayout({
  children,
  sidebarItems,
  profileURL,
}: BaseLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    // Aquí si usas algo como localStorage para usuario, limpia también:
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen bg-gray-400 text-blue relative">
      {/* Sidebar */}
      <aside className="bg-[#e2e3f0] p-6 sticky top-0 h-20 flex flex-col z-10">
        {/* Perfil */}
        <Link href={profileURL}>
          <div
            className={`mb-8 p-4 rounded-md transition flex items-center justify-center gap-2 ${
              pathname === profileURL
                ? "bg-black text-white shadow-md"
                : "hover:bg-[#a0a0a8] text-white"
            }`}
          >
            <UserCircle className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Perfil</h2>
          </div>
        </Link>

        {/* Navegación */}
        <nav className="flex flex-row gap-4 relative z-10 justify-center">
          {sidebarItems.map(({ href, icon, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold transition-all relative
          ${
            isActive
              ? "bg-black text-white shadow-md rounded-full"
              : "text-white hover:bg-[#e0e0e9] hover:text-white rounded-xl"
          }`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
{/* Botón cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 rounded-md text-black bg-gray-400 hover:bg-gray-700 transition"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
        
      </aside>
          

          
      {/* Panel derecho */}
      <main className="flex flex-col min-h-screen bg-gray-100">
        <section className="flex-grow p-6">{children}</section>
        <footer className="text-center py-4 text-sm text-gray-500">
          Cargo-Track 2025 — Todos los derechos reservados
        </footer>
      </main>
      
    </div>
  );
}
