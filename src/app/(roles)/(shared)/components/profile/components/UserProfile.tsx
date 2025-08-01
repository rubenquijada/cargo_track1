"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
    return (
      <p className="text-black text-center mt-8">
        Cargando usuario...
      </p>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center  bg-transparent text-white font-sans p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center p-2 rounded-xl max-w-xl w-full shadow-lg bg-gray-200">
        

        <h1 className="text-3xl font-bold mb-2 text-gray-600">{user.nombre}</h1>
        <p className="text-lg text-gray-400 mb-10">{user.email}</p>

        <div className="text-center w-full mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Información</h2>
          <div className="text-lg leading-relaxed max-w-md mx-auto flex flex-col gap-3">
            <div className="flex justify-between items-center w-full">
              <span className="font-bold text-gray-600">Teléfono:</span>
              <span className="text-gray-400">{user.telefono}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="font-bold text-gray-600">Email:</span>
              <span className="text-gray-400">{user.email}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="font-bold text-gray-600">Cédula:</span>
              <span className="text-gray-400">{user.cedula}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
