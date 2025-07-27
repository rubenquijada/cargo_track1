'use client';

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  RefreshCcw,
  Truck,
  Users, // Aunque Users no se usa aquí, la mantenemos si es un componente común
} from 'lucide-react';

export default function EmpleadoInicioPage() {
  const [nombre, setNombre] = useState("");
  // --- Nuevos estados para las cantidades ---
  const [paquetesRegistradosCount, setPaquetesRegistradosCount] = useState(0);
  const [paquetesEnAlmacenCount, setPaquetesEnAlmacenCount] = useState(0); // Paquetes que cambiaron de En Transito a En Almacen
  const [enviosAsociadosCount, setEnviosAsociadosCount] = useState(0);
  // ------------------------------------------

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.nombre) {
      setNombre(user.nombre);
    }

    // --- Obtener cantidad de paquetes registrados hoy ---
    fetch("/api/paquetes/registrados-hoy")
      .then(res => res.json())
      .then(data => setPaquetesRegistradosCount(data.count))
      .catch(error => console.error("Error al obtener paquetes registrados hoy:", error));

    // --- Obtener cantidad de paquetes con cambio de estado de 'en transito' a 'en almacen' hoy ---
    fetch("/api/paquetes/transito-a-almacen-hoy")
      .then(res => res.json())
      .then(data => setPaquetesEnAlmacenCount(data.count))
      .catch(error => console.error("Error al obtener cambios de estado 'en transito' a 'en almacen':", error));

    // --- Obtener cantidad de envíos asociados hoy ---
    fetch("/api/envios/asociados-hoy")
      .then(res => res.json())
      .then(data => setEnviosAsociadosCount(data.count))
      .catch(error => console.error("Error al obtener envíos asociados hoy:", error));

  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

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
              <h2 className="text-4xl font-bold">{paquetesRegistradosCount}</h2>
              <p className="text-sm text-black">Paquetes registrados hoy</p>
            </div>
            <Package className="w-10 h-10 text-green-600" />
          </div>
        </motion.div>

        {/* Paquetes en almacén (cambio de estado) */}
        <motion.div
          className="bg-gradient-to-br from-white to-white rounded-2xl p-6 shadow-md "
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">{paquetesEnAlmacenCount}</h2>
              <p className="text-sm text-black">Paquetes en almacén hoy</p>
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
              <h2 className="text-4xl font-bold">{enviosAsociadosCount}</h2>
              <p className="text-sm text-black">Envíos asociados hoy</p>
            </div>
            <Truck className="w-10 h-10 text-blue-600" />
          </div>
        </motion.div>
      </section>

      {/* Aquí podrías añadir más secciones de acceso rápido si lo necesitas */}
    </motion.main>
  );
}