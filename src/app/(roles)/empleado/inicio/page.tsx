'use client';

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  RefreshCcw,
  Truck,
  Users,
} from 'lucide-react';

export default function EmpleadoInicioPage() {
  const [nombre, setNombre] = useState("");
  useEffect(() => {
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
    transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Bienvenida */}
      <h1 className="text-gray-700 text-4xl font-bold tracking-tight mb-2">
        <span className="text-gray-900">Te damos la bienvenida Emplead@: <>{nombre}</></span>
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Panel de control de tus actividades diarias
      </p>

      {/* Tarjetas informativas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Paquetes registrados hoy */}
        <motion.div
          className="bg-gradient-to-br from-white to-white rounded-2xl p-6 shadow-md "
          
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">12</h2>
              <p className="text-sm text-black">Paquetes registrados hoy</p>
            </div>
            <Package className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>

        {/* Cambios de estado */}
        <motion.div
          className="bg-gradient-to-br from-white to-white rounded-2xl p-6 shadow-md "
          
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">7</h2>
              <p className="text-sm text-black">Cambios de estado</p>
            </div>
            <RefreshCcw className="w-10 h-10 text-yellow-600" />
          </div>
        </motion.div>

        {/* Envíos asociados hoy */}
        <motion.div
          className="bg-gradient-to-br from-white to-white rounded-2xl p-6 shadow-md "
          
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">4</h2>
              <p className="text-sm text-black">Envíos asociados hoy</p>
            </div>
            <Truck className="w-10 h-10 text-blue-600" />
          </div>
        </motion.div>
      </section>

    </motion.main>
  );
}