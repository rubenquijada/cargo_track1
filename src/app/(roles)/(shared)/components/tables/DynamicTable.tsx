"use client";
import { useState, useEffect } from "react";
import { DynamicTableProps } from "./types";

import { motion } from "framer-motion";
import DynamicHeader from "@/app/(roles)/cliente/components/DynamicHeader";

export default function DynamicTable<T extends object>({
  name,
  columns,
  data,
  rowsPerPage = 5,
  children,
  idName = "codigo",
}: DynamicTableProps<T>) {
  const [filtro, setFiltro] = useState(columns[0].key);
  const [debouncedFiltro, setDebouncedFiltro] = useState(columns[0].key);
  const [busqueda, setBusqueda] = useState("");
  const [debouncedBusqueda, setDebouncedBusqueda] = useState(""); // Nuevo estado
  const [page, setPage] = useState(0);

  // Retraso de 1.5 segundos para el filtro
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBusqueda(busqueda);
    }, 2500);

    return () => clearTimeout(handler);
  }, [busqueda]);

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedFiltro(filtro);
  }, 3500);
    return () => clearTimeout(handler);
  },[filtro]);

  const filteredData = debouncedBusqueda
    ? data.filter((row) =>
        String((row as any)[filtro])
          .toLowerCase()
          .includes(debouncedBusqueda.toLowerCase())
      )
    : data;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangeFilter = (e: any) => {
    setFiltro(e.target.value);
  };

  const handleChange = (e: any) => {
    setBusqueda(e.target.value);
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-xl mt-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {name && (
        <DynamicHeader
          filtro={filtro}
          onChangeFilter={handleChangeFilter}
          columns={columns}
          onChange={handleChange}
          h1Text={name}
        >
          {children}
        </DynamicHeader>
      )}
      <div className="overflow-auto max-w-full">
        <table className="min-w-full text-sm text-gray-500 table-fixed overflow-hidden border border-gray-200 rounded-lg">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-200 text-black  tracking-wide text-sm">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-200 transition-all"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3 text-left truncate"
                    >
                      {col.render
                        ? col.render((row as any)[col.key], row)
                        : String((row as any)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No hay datos para mostrar. Intenta ajustar los filtros o busca
                  algo diferente.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > rowsPerPage && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              ◀ Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  page === i
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Siguiente ▶
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
