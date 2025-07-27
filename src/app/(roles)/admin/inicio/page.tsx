"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Warehouse, Users } from 'lucide-react';

export default function AdminInicioPage() {
  const [nombre, setNombre] = useState("");
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [almacenesCount, setAlmacenesCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.nombre) {
      setNombre(user.nombre);
    }

    // Obtener cantidad de usuarios
    fetch("/api/usuarios/count")
      .then(res => res.json())
      .then(data => setUsuariosCount(data.count));

    // Obtener cantidad de almacenes
    fetch("/api/almacenes/count")
      .then(res => res.json())
      .then(data => setAlmacenesCount(data.count));
  }, []);
  return (
    <motion.main
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      <h1 className="text-2xl font-bold tracking-tight mb-2">
       <span className="text-gray-700">Bienvenido {nombre}</span> <span className="text-gray-700"></span>
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Panel de gestión del sistema
      </p>

      {/* Tarjetas informativas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {/* Usuarios registrados */}
        <motion.div
          className="bg-gradient-to-br from-white rounded-2xl p-6 shadow-md "
          
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">{usuariosCount}</h2>
              <p className="text-sm text-black">Usuarios registrados</p>
            </div>
            <Users className="w-10 h-10 text-blue-700" />
          </div>
        </motion.div>

        {/* Almacenes activos */}
        <motion.div
          className="bg-gradient-to-br from-white to-white rounded-2xl p-6 shadow-md "
        
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">{almacenesCount}</h2>
              <p className="text-sm text-black">Almacenes activos</p>
            </div>
            <Warehouse className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>
      </section>

      
    </motion.main>
  );
}
