"use client";

import { UserCircle, MailOpen, PhoneCall, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  nombre: string;
  email: string;
  telefono: string;
  cedula: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.warn("No se pudo parsear el usuario almacenado");
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return <p className="text-black text-center mt-8">Cargando usuario...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-39 space-y-19 items-center justify-center">
      {/* Tarjeta blanca sobre fondo negro heredado */}
      <div className="bg-white text-black p-6 rounded-xl shadow-lg items-center max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UserCircle className="h-6 w-6 text-green-300" />
          <span className="text-3xl font-bold mb-2 text-gray-600">
            {user.nombre}
          </span>
        </h1>

        <ul className="space-y-4 text-lg">
          <li className="flex items-center gap-3">
            <MailOpen className="h-5 w-5 text-green-300" />
            <span className="text-gray-400">{user.email}</span>
          </li>
          <li className="flex items-center gap-3">
            <PhoneCall className="h-5 w-5 text-green-300" />
            <span className="text-gray-400">{user.telefono}</span>
          </li>

          <li className="flex items-center gap-3">
            <UsersRound className="h-5 w-5 text-green-300" />
            <span className="text-gray-400">{user.cedula}</span>
          </li>
        </ul>

        <div className="mt-6 text-right">
          {/*<Link href="/cliente/perfil/editar">
            <button className="bg-green-300 text-gray-700 px-4 py-2 rounded-md hover:bg-green-400 transition">
              Editar perfil
            </button>
          </Link>*/}
        </div>
      </div>
    </div>
  );
}
