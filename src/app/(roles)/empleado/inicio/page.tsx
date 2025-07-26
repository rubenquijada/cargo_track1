'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  RefreshCcw,
  Truck,
  Users,
} from 'lucide-react';

export default function EmpleadoInicioPage() {
  return (
    <motion.main
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Bienvenida */}
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        ¡Bienvenido a <span className="text-gray-700">Empleado</span>!
      </h1>
      <p className="text-gray-300 text-lg mb-6">
        Panel de control de tus actividades diarias
      </p>

      {/* Tarjetas informativas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Paquetes registrados hoy */}
        <motion.div
          className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">12</h2>
              <p className="text-sm text-gray-300">Paquetes registrados hoy</p>
            </div>
            <Package className="w-10 h-10 text-purple-100" />
          </div>
        </motion.div>

        {/* Cambios de estado */}
        <motion.div
          className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">7</h2>
              <p className="text-sm text-gray-700">Cambios de estado</p>
            </div>
            <RefreshCcw className="w-10 h-10 text-gray-700" />
          </div>
        </motion.div>

        {/* Envíos asociados hoy */}
        <motion.div
          className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">4</h2>
              <p className="text-sm text-gray-700">Envíos asociados hoy</p>
            </div>
            <Truck className="w-10 h-10 text-gray-700" />
          </div>
        </motion.div>
      </section>

      {/* Accesos rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/empleado/paquetes"
          className="bg-green-200 hover:bg-green-300 text-gray-700 text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md"
        >
          Registrar paquete
        </Link>
        <Link
          href="/empleado/envios"
          className="bg-blue-700 hover:bg-blue-800 text-white text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md"
        >
          Asociar envío
        </Link>
        <Link
          href="/empleado/estado"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md"
        >
          Cambiar estado
        </Link>
        <Link
          href="/empleado/clientes"
          className="bg-gray-800 hover:bg-gray-900 text-white text-center font-semibold py-8 px-4 rounded-2xl transition text-lg shadow-md"
        >
          Ver clientes
        </Link>
      </section>
    </motion.main>
  );
}