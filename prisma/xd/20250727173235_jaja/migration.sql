/*
  Warnings:

  - You are about to drop the column `direccionId` on the `Almacen` table. All the data in the column will be lost.
  - You are about to drop the `Direccion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ciudad` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoPostal` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linea1` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linea2` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Almacen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Almacen" DROP CONSTRAINT "Almacen_direccionId_fkey";

-- DropIndex
DROP INDEX "Almacen_direccionId_key";

-- AlterTable
ALTER TABLE "Almacen" DROP COLUMN "direccionId",
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "codigoPostal" INTEGER NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "linea1" TEXT NOT NULL,
ADD COLUMN     "linea2" TEXT NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL;

-- DropTable
DROP TABLE "Direccion";
