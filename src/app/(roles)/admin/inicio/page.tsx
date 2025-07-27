"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Warehouse, Users } from 'lucide-react';

export default function AdminInicioPage() {
  const [nombre, setNombre] = useState("");
  useEffect(effect => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.nombre) {
      setNombre(user.nombre);
    }
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
              <h2 className="text-4xl font-bold">23</h2>
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
              <h2 className="text-4xl font-bold">5</h2>
              <p className="text-sm text-black">Almacenes activos</p>
            </div>
            <Warehouse className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>
      </section>

      {/* Accesos rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/usuarios"
          className="bg-white hover:bg-white text-black text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md "
        >
          Gestionar usuarios
        </Link>
        <Link
          href="/admin/almacen"
          className="bg-white hover:bg-white text-black text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md"
        >
          Ver almacenes
        </Link>
      </section>
    </motion.main>
  );
}
