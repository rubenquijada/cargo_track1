"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit } from "lucide-react"

interface PackageType {
  id: string
  trackingNumber: string
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
  cubicFeet: number
  description: string
  warehouse: string
  status: "received" | "in_transit" | "available" | "dispatched"
  client: string
  registeredBy: string
  registeredAt: string
}

interface PackageManagementProps {
  userRole: "admin" | "employee" | "client"
}

export function PackageManagement({ userRole }: PackageManagementProps) {
  const [packages, setPackages] = useState<PackageType[]>([
    {
      id: "1",
      trackingNumber: "CT2024001234",
      dimensions: { length: 12, width: 8, height: 6 },
      weight: 2.5,
      cubicFeet: 0.33,
      description: "Electrónicos - Smartphone",
      warehouse: "ORL-001",
      status: "received",
      client: "Juan Pérez",
      registeredBy: "Carlos Rodríguez",
      registeredAt: "2024-01-20",
    },
    {
      id: "2",
      trackingNumber: "CT2024001235",
      dimensions: { length: 16, width: 12, height: 8 },
      weight: 4.2,
      cubicFeet: 0.89,
      description: "Ropa - Zapatos deportivos",
      warehouse: "DOR-001",
      status: "in_transit",
      client: "María González",
      registeredBy: "Carlos Rodríguez",
      registeredAt: "2024-01-19",
    },
    {
      id: "3",
      trackingNumber: "CT2024001236",
      dimensions: { length: 10, width: 10, height: 4 },
      weight: 1.8,
      cubicFeet: 0.23,
      description: "Libros - Novelas",
      warehouse: "LGU-001",
      status: "available",
      client: "Juan Pérez",
      registeredBy: "Ana López",
      registeredAt: "2024-01-18",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null)

  const [formData, setFormData] = useState({
    trackingNumber: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    description: "",
    warehouse: "",
    client: "",
    status: "received" as PackageType["status"],
  })

  const calculateCubicFeet = (length: number, width: number, height: number) => {
    return (length * width * height) / 1728
  }

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = `${pkg.trackingNumber} ${pkg.description} ${pkg.client}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || pkg.status === selectedStatus
    const matchesWarehouse = selectedWarehouse === "all" || pkg.warehouse === selectedWarehouse
    return matchesSearch && matchesStatus && matchesWarehouse
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const length = Number.parseFloat(formData.length)
    const width = Number.parseFloat(formData.width)
    const height = Number.parseFloat(formData.height)
    const weight = Number.parseFloat(formData.weight)

    const packageData: PackageType = {
      id: editingPackage?.id || Date.now().toString(),
      trackingNumber: formData.trackingNumber,
      dimensions: { length, width, height },
      weight,
      cubicFeet: calculateCubicFeet(length, width, height),
      description: formData.description,
      warehouse: formData.warehouse,
      status: formData.status,
      client: formData.client,
      registeredBy: "Usuario Actual",
      registeredAt: new Date().toISOString().split("T")[0],
    }

    if (editingPackage) {
      setPackages(packages.map((p) => (p.id === editingPackage.id ? packageData : p)))
    } else {
      setPackages([...packages, packageData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      trackingNumber: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      description: "",
      warehouse: "",
      client: "",
      status: "received",
    })
    setEditingPackage(null)
  }

  const handleEdit = (pkg: PackageType) => {
    setEditingPackage(pkg)
    setFormData({
      trackingNumber: pkg.trackingNumber,
      length: pkg.dimensions.length.toString(),
      width: pkg.dimensions.width.toString(),
      height: pkg.dimensions.height.toString(),
      weight: pkg.weight.toString(),
      description: pkg.description,
      warehouse: pkg.warehouse,
      client: pkg.client,
      status: pkg.status,
    })
    setIsDialogOpen(true)
  }

  const updatePackageStatus = (packageId: string, newStatus: PackageType["status"]) => {
    setPackages(packages.map((p) => (p.id === packageId ? { ...p, status: newStatus } : p)))
  }

  const getStatusBadge = (status: PackageType["status"]) => {
    const variants = {
      received: "bg-blue-600",
      in_transit: "bg-orange-600",
      available: "bg-green-600",
      dispatched: "bg-gray-600",
    }
    const labels = {
      received: "Recibido",
      in_transit: "En Tránsito",
      available: "Disponible",
      dispatched: "Despachado",
    }
    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const canEditPackage = userRole === "admin" || userRole === "employee"
  const canCreatePackage = userRole === "admin" || userRole === "employee"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestión de Paquetes</CardTitle>
              <CardDescription>
                {userRole === "client" ? "Visualiza el estado de tus paquetes" : "Administra los paquetes del sistema"}
              </CardDescription>
            </div>
            {canCreatePackage && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Paquete
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingPackage ? "Editar Paquete" : "Registrar Paquete"}</DialogTitle>
                    <DialogDescription>
                      {editingPackage
                        ? "Modifica los datos del paquete"
                        : "Completa los datos para registrar un nuevo paquete"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="trackingNumber">Número de Tracking</Label>
                          <Input
                            id="trackingNumber"
                            value={formData.trackingNumber}
                            onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                            placeholder="CT2024001234"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client">Cliente</Label>
                          <Input
                            id="client"
                            value={formData.client}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            placeholder="Nombre del cliente"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Dimensiones (pulgadas)</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="length">Largo</Label>
                            <Input
                              id="length"
                              type="number"
                              step="0.1"
                              value={formData.length}
                              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="width">Ancho</Label>
                            <Input
                              id="width"
                              type="number"
                              step="0.1"
                              value={formData.width}
                              onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="height">Alto</Label>
                            <Input
                              id="height"
                              type="number"
                              step="0.1"
                              value={formData.height}
                              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Peso (libras)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Descripción del contenido del paquete"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="warehouse">Almacén</Label>
                          <Select
                            value={formData.warehouse}
                            onValueChange={(value) => setFormData({ ...formData, warehouse: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar almacén" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ORL-001">Orlando Warehouse</SelectItem>
                              <SelectItem value="DOR-001">Doral Warehouse</SelectItem>
                              <SelectItem value="LGU-001">La Guaira Warehouse</SelectItem>
                              <SelectItem value="NES-001">Nueva Esparta Warehouse</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Estado</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value: PackageType["status"]) =>
                              setFormData({ ...formData, status: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="received">Recibido</SelectItem>
                              <SelectItem value="in_transit">En Tránsito</SelectItem>
                              <SelectItem value="available">Disponible</SelectItem>
                              <SelectItem value="dispatched">Despachado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.length && formData.width && formData.height && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Volumen calculado:{" "}
                            {calculateCubicFeet(
                              Number.parseFloat(formData.length) || 0,
                              Number.parseFloat(formData.width) || 0,
                              Number.parseFloat(formData.height) || 0,
                            ).toFixed(2)}{" "}
                            pies cúbicos
                          </p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit">{editingPackage ? "Actualizar" : "Registrar Paquete"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar paquetes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="received">Recibido</SelectItem>
                <SelectItem value="in_transit">En Tránsito</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="dispatched">Despachado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por almacén" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los almacenes</SelectItem>
                <SelectItem value="ORL-001">Orlando</SelectItem>
                <SelectItem value="DOR-001">Doral</SelectItem>
                <SelectItem value="LGU-001">La Guaira</SelectItem>
                <SelectItem value="NES-001">Nueva Esparta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Packages Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Dimensiones</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Vol. (ft³)</TableHead>
                <TableHead>Almacén</TableHead>
                <TableHead>Estado</TableHead>
                {canEditPackage && <TableHead>Acciones</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.trackingNumber}</TableCell>
                  <TableCell>{pkg.client}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={pkg.description}>
                      {pkg.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {pkg.dimensions.length}" × {pkg.dimensions.width}" × {pkg.dimensions.height}"
                    </span>
                  </TableCell>
                  <TableCell>{pkg.weight} lbs</TableCell>
                  <TableCell>{pkg.cubicFeet.toFixed(2)}</TableCell>
                  <TableCell>{pkg.warehouse}</TableCell>
                  <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                  {canEditPackage && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(pkg)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select
                          value={pkg.status}
                          onValueChange={(value: PackageType["status"]) => updatePackageStatus(pkg.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="received">Recibido</SelectItem>
                            <SelectItem value="in_transit">En Tránsito</SelectItem>
                            <SelectItem value="available">Disponible</SelectItem>
                            <SelectItem value="dispatched">Despachado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Mostrando {filteredPackages.length} de {packages.length} paquetes
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
