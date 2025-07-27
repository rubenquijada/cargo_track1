"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Truck, Package, FileText } from "lucide-react";

export default function ClienteDashboard() {
  const [nombre, setNombre] = useState("");
  const [paquetes, setPaquetes] = useState({ total: 0, transito: 0, pendientes: 0 });
  const [facturas, setFacturas] = useState({ pendientes: 0, pagadas: 0 });
  const [ultimoEnvio, setUltimoEnvio] = useState({ codigo: "", estado: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.nombre) {
      setNombre(user.nombre);

      const alreadyWelcomed = sessionStorage.getItem("bienvenida-mostrada");
      if (!alreadyWelcomed) {
        toast.success(`Bienvenido, ${user.nombre}`);
        sessionStorage.setItem("bienvenida-mostrada", "true");
      }
    }

    // Obtener datos de paquetes
    fetch(`/api/paquetes?clienteId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const total = data.length;
        const transito = data.filter((p: any) => p.estado === "EN_TRANSITO").length;
        const pendientes = data.filter((p: any) => p.estado === "REGISTRADO").length;
        setPaquetes({ total, transito, pendientes });
      });

    // Obtener datos de facturas
    fetch(`/api/facturas?clienteId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const pendientes = data.filter((f: any) => f.estado === "PENDIENTE").length;
        const pagadas = data.filter((f: any) => f.estado === "PAGADA").length;
        setFacturas({ pendientes, pagadas });
      });

    // Obtener último envío
    fetch(`/api/envios/cliente?clienteId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const ultimo = data[data.length - 1];
          setUltimoEnvio({ codigo: ultimo.numero, estado: ultimo.estado });
        }
      });
  }, []);

  return (
    <motion.div
      className="flex flex-col h-full bg-gray-100 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Encabezado */}
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Bienvenid@ estimad@ cliente: <span className="text-gray-700">{nombre}</span>
      </h1>
      <p className="text-gray-700 text-lg mb-6">Que desea ver hoy?</p>

      {/* Tarjetas resumen */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <Truck className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold">Envíos</h3>
            <p>Total: {paquetes.total}</p>
            <p>En tránsito: {paquetes.transito}</p>
            <p>Pendientes: {paquetes.pendientes}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <Package className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="text-xl font-semibold">Paquetes</h3>
            <p>Total: {paquetes.total}</p>
            <p>En tránsito: {paquetes.transito}</p>
            <p>Pendientes: {paquetes.pendientes}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FileText className="h-8 w-8 text-yellow-600" />
          <div>
            <h3 className="text-xl font-semibold">Facturas</h3>
            <p>Pendientes: {facturas.pendientes}</p>
            <p>Pagadas: {facturas.pagadas}</p>
          </div>
        </div>

        {/* Último envío */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
          <h3 className="text-xl font-semibold mb-2">Último Envío</h3>
          <p>Código: {ultimoEnvio.codigo}</p>
          <p>Estado: {ultimoEnvio.estado}</p>
        </div>
      </section>
    </motion.div>
  );
}
