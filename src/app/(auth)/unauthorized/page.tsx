"use client";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Este div ya centra su contenido horizontal y verticalmente */}
      <div className="relative z-20 max-w-sm w-full bg-transparent p-6 space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-white">Acceso denegado</h2>

        <button
          className="inline-block w-full rounded-md bg-gray-300 py-2 text-gray-700 font-semibold hover:bg-gray-500 transition"
          onClick={() => history.back()}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}