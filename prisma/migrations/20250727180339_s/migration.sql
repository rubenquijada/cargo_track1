-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('CLIENTE', 'EMPLEADO', 'ADMIN');

-- CreateEnum
CREATE TYPE "EstadoPaquete" AS ENUM ('REGISTRADO', 'EN_TRANSITO', 'EN_ALMACEN', 'ENTREGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoEnvio" AS ENUM ('BARCO', 'AVION');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Almacen" (
    "codigo" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" SERIAL NOT NULL,
    "linea1" TEXT NOT NULL,
    "linea2" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "codigoPostal" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paquete" (
    "tracking" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoPaquete" NOT NULL,
    "tipoEnvio" "TipoEnvio" NOT NULL DEFAULT 'AVION',
    "almacenCodigo" INTEGER NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "medidasId" INTEGER NOT NULL,
    "origenId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "clienteOrigenId" INTEGER NOT NULL,
    "clienteDestinoId" INTEGER NOT NULL,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("tracking")
);

-- CreateTable
CREATE TABLE "Medidas" (
    "id" SERIAL NOT NULL,
    "largo" DOUBLE PRECISION NOT NULL,
    "ancho" DOUBLE PRECISION NOT NULL,
    "alto" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "volumen" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Medidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envio" (
    "numero" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fechaSalida" TEXT NOT NULL,
    "fechaLlegada" TEXT NOT NULL,
    "almacenOrigen" INTEGER NOT NULL,
    "almacenEnvio" INTEGER NOT NULL,
    "empleadoCedula" INTEGER NOT NULL,

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "DetalleEnvio" (
    "id" SERIAL NOT NULL,
    "paqueteTracking" INTEGER NOT NULL,
    "envioNumero" INTEGER NOT NULL,

    CONSTRAINT "DetalleEnvio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "numero" SERIAL NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "cantPiezas" INTEGER NOT NULL,
    "envioNumero" INTEGER NOT NULL,
    "clienteCedula" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "DetalleFactura" (
    "numero" SERIAL NOT NULL,
    "facturaNumero" INTEGER NOT NULL,
    "paqueteTracking" INTEGER NOT NULL,

    CONSTRAINT "DetalleFactura_pkey" PRIMARY KEY ("numero")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioRol_usuarioId_rol_key" ON "UsuarioRol"("usuarioId", "rol");

-- CreateIndex
CREATE UNIQUE INDEX "Almacen_direccionId_key" ON "Almacen"("direccionId");

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_medidasId_key" ON "Paquete"("medidasId");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_envioNumero_key" ON "Factura"("envioNumero");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleFactura_paqueteTracking_key" ON "DetalleFactura"("paqueteTracking");

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Almacen" ADD CONSTRAINT "Almacen_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_medidasId_fkey" FOREIGN KEY ("medidasId") REFERENCES "Medidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_almacenCodigo_fkey" FOREIGN KEY ("almacenCodigo") REFERENCES "Almacen"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "Almacen"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Almacen"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_clienteOrigenId_fkey" FOREIGN KEY ("clienteOrigenId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_clienteDestinoId_fkey" FOREIGN KEY ("clienteDestinoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_almacenOrigen_fkey" FOREIGN KEY ("almacenOrigen") REFERENCES "Almacen"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_almacenEnvio_fkey" FOREIGN KEY ("almacenEnvio") REFERENCES "Almacen"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_empleadoCedula_fkey" FOREIGN KEY ("empleadoCedula") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleEnvio" ADD CONSTRAINT "DetalleEnvio_paqueteTracking_fkey" FOREIGN KEY ("paqueteTracking") REFERENCES "Paquete"("tracking") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleEnvio" ADD CONSTRAINT "DetalleEnvio_envioNumero_fkey" FOREIGN KEY ("envioNumero") REFERENCES "Envio"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_envioNumero_fkey" FOREIGN KEY ("envioNumero") REFERENCES "Envio"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_clienteCedula_fkey" FOREIGN KEY ("clienteCedula") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_facturaNumero_fkey" FOREIGN KEY ("facturaNumero") REFERENCES "Factura"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_paqueteTracking_fkey" FOREIGN KEY ("paqueteTracking") REFERENCES "Paquete"("tracking") ON DELETE RESTRICT ON UPDATE CASCADE;
