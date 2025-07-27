// src/app/api/almacenes/count/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Importa NextResponse para respuestas JSON

const prisma = new PrismaClient();

// Define una función para el método GET
export async function GET() { // <-- CAMBIO CLAVE: Exporta 'GET' en lugar de 'default function handler'
  try {
    const count = await prisma.almacen.count();
    console.log("Conteo de almacenes exitoso:", count); // Para depuración
    return NextResponse.json({ count }, { status: 200 }); // <-- CAMBIO CLAVE: Usa NextResponse.json
  } catch (error) {
    console.error("Error en /api/almacenes/count:", error);
    // Asegúrate de devolver un error JSON en caso de fallo
    return NextResponse.json(
      { error: "Error interno del servidor al obtener almacenes" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Puedes añadir otros métodos HTTP si los necesitas