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
    <div className="min-h-screen flex flex-col bg-white text-black">
      <nav className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-black-500">CargoTrack</h1>
        <div className="flex items-center gap-4">
          {/* Perfil */}
          <Link href={profileURL}>
            <div
              className={`p-1 rounded-md transition flex items-center justify-center gap-2 ${
                pathname === profileURL
                  ? "bg-gray-300 text-gray-700 shadow-md"
                  : "hover:bg-gray-300 text-gray-700"
              }`}
            >
              <UserCircle className="h-6 w-6" />
              <h2 className="text-2xl ">Perfil</h2>
            </div>
          </Link>
          {/* Botón cerrar sesión */}
          <button
            onClick={handleLogout}
            className=" flex items-center gap-2 px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-300 transition"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-[16rem_1fr] min-h-screen bg-gray-400 text-blue relative">
        {/* Sidebar */}
        <aside className="bg-gray-400 p-6 sticky top-0 h-20 flex flex-col z-10">
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
              : "text-white hover:bg-[#141415] hover:text-white rounded-xl"
          }`}
                >
                  <span>{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Panel derecho */}
        <main className="flex flex-col min-h-screen bg-gray-100">
          <section className="flex-grow p-6">{children}</section>
          <footer className="text-center py-4 text-sm text-gray-500">
            Cargo-Track 2025 — Todos los derechos reservados
          </footer>
        </main>
      </div>
    </div>
  );
}
