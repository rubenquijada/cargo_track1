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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Plane, Ship, Package } from "lucide-react"

interface Shipment {
  id: string
  code: string
  originWarehouse: string
  destinationWarehouse: string
  departureDate: string
  arrivalDate: string
  status: "at_port" | "in_transit" | "at_destination"
  type: "air" | "sea"
  packages: string[]
  totalCost: number
}

export function ShipmentManagement() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "1",
      code: "ENV-2024-001",
      originWarehouse: "ORL-001",
      destinationWarehouse: "LGU-001",
      departureDate: "2024-01-20",
      arrivalDate: "2024-01-25",
      status: "in_transit",
      type: "sea",
      packages: ["CT2024001234", "CT2024001235"],
      totalCost: 125.5,
    },
    {
      id: "2",
      code: "ENV-2024-002",
      originWarehouse: "DOR-001",
      destinationWarehouse: "NES-001",
      departureDate: "2024-01-22",
      arrivalDate: "2024-01-23",
      status: "at_destination",
      type: "air",
      packages: ["CT2024001236"],
      totalCost: 89.75,
    },
  ])

  const [availablePackages] = useState([
    { id: "CT2024001237", description: "Electrónicos", weight: 3.2, cubicFeet: 0.45, warehouse: "ORL-001" },
    { id: "CT2024001238", description: "Ropa", weight: 1.8, cubicFeet: 0.28, warehouse: "DOR-001" },
    { id: "CT2024001239", description: "Libros", weight: 2.1, cubicFeet: 0.31, warehouse: "ORL-001" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null)

  const [formData, setFormData] = useState({
    code: "",
    originWarehouse: "",
    destinationWarehouse: "",
    departureDate: "",
    arrivalDate: "",
    type: "sea" as Shipment["type"],
    status: "at_port" as Shipment["status"],
    selectedPackages: [] as string[],
  })

  const calculateShipmentCost = (packages: string[], type: Shipment["type"]) => {
    let totalCost = 0

    packages.forEach((packageId) => {
      const pkg = availablePackages.find((p) => p.id === packageId)
      if (pkg) {
        if (type === "sea") {
          const cost = pkg.cubicFeet * 25
          totalCost += Math.max(cost, 35) // Mínimo $35
        } else {
          const weightCost = pkg.weight * 7
          const volumeCost = pkg.cubicFeet * 7
          const cost = Math.max(weightCost, volumeCost)
          totalCost += Math.max(cost, 45) // Mínimo $45
        }
      }
    })

    return totalCost
  }

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = `${shipment.code} ${shipment.originWarehouse} ${shipment.destinationWarehouse}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || shipment.status === selectedStatus
    const matchesType = selectedType === "all" || shipment.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const totalCost = calculateShipmentCost(formData.selectedPackages, formData.type)

    const shipmentData: Shipment = {
      id: editingShipment?.id || Date.now().toString(),
      code: formData.code,
      originWarehouse: formData.originWarehouse,
      destinationWarehouse: formData.destinationWarehouse,
      departureDate: formData.departureDate,
      arrivalDate: formData.arrivalDate,
      type: formData.type,
      status: formData.status,
      packages: formData.selectedPackages,
      totalCost,
    }

    if (editingShipment) {
      setShipments(shipments.map((s) => (s.id === editingShipment.id ? shipmentData : s)))
    } else {
      setShipments([...shipments, shipmentData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      code: "",
      originWarehouse: "",
      destinationWarehouse: "",
      departureDate: "",
      arrivalDate: "",
      type: "sea",
      status: "at_port",
      selectedPackages: [],
    })
    setEditingShipment(null)
  }

  const handleEdit = (shipment: Shipment) => {
    setEditingShipment(shipment)
    setFormData({
      code: shipment.code,
      originWarehouse: shipment.originWarehouse,
      destinationWarehouse: shipment.destinationWarehouse,
      departureDate: shipment.departureDate,
      arrivalDate: shipment.arrivalDate,
      type: shipment.type,
      status: shipment.status,
      selectedPackages: shipment.packages,
    })
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: Shipment["status"]) => {
    const variants = {
      at_port: "bg-orange-600",
      in_transit: "bg-blue-600",
      at_destination: "bg-green-600",
    }
    const labels = {
      at_port: "En Puerto",
      in_transit: "En Tránsito",
      at_destination: "En Destino",
    }
    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const getTypeIcon = (type: Shipment["type"]) => {
    return type === "air" ? <Plane className="h-4 w-4 text-blue-600" /> : <Ship className="h-4 w-4 text-green-600" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestión de Envíos</CardTitle>
              <CardDescription>Administra los envíos marítimos y aéreos</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Envío
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{editingShipment ? "Editar Envío" : "Nuevo Envío"}</DialogTitle>
                  <DialogDescription>
                    {editingShipment ? "Modifica los datos del envío" : "Completa los datos para crear un nuevo envío"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Código de Envío</Label>
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          placeholder="ENV-2024-001"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Envío</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: Shipment["type"]) => setFormData({ ...formData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sea">Marítimo ($25/ft³, mín $35)</SelectItem>
                            <SelectItem value="air">Aéreo ($7/lb o vol, mín $45)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="originWarehouse">Almacén de Origen</Label>
                        <Select
                          value={formData.originWarehouse}
                          onValueChange={(value) => setFormData({ ...formData, originWarehouse: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar origen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ORL-001">Orlando Warehouse</SelectItem>
                            <SelectItem value="DOR-001">Doral Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationWarehouse">Almacén de Destino</Label>
                        <Select
                          value={formData.destinationWarehouse}
                          onValueChange={(value) => setFormData({ ...formData, destinationWarehouse: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar destino" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LGU-001">La Guaira Warehouse</SelectItem>
                            <SelectItem value="NES-001">Nueva Esparta Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="departureDate">Fecha de Salida</Label>
                        <Input
                          id="departureDate"
                          type="date"
                          value={formData.departureDate}
                          onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="arrivalDate">Fecha de Llegada</Label>
                        <Input
                          id="arrivalDate"
                          type="date"
                          value={formData.arrivalDate}
                          onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Estado</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: Shipment["status"]) => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="at_port">En Puerto</SelectItem>
                            <SelectItem value="in_transit">En Tránsito</SelectItem>
                            <SelectItem value="at_destination">En Destino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Seleccionar Paquetes</Label>
                      <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                        {availablePackages
                          .filter((pkg) => pkg.warehouse === formData.originWarehouse)
                          .map((pkg) => (
                            <div key={pkg.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                              <Checkbox
                                checked={formData.selectedPackages.includes(pkg.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData({
                                      ...formData,
                                      selectedPackages: [...formData.selectedPackages, pkg.id],
                                    })
                                  } else {
                                    setFormData({
                                      ...formData,
                                      selectedPackages: formData.selectedPackages.filter((id) => id !== pkg.id),
                                    })
                                  }
                                }}
                              />
                              <Package className="h-4 w-4 text-gray-400" />
                              <div className="flex-1">
                                <p className="font-medium">{pkg.id}</p>
                                <p className="text-sm text-gray-600">{pkg.description}</p>
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                <p>{pkg.weight} lbs</p>
                                <p>{pkg.cubicFeet} ft³</p>
                              </div>
                            </div>
                          ))}
                      </div>

                      {formData.selectedPackages.length > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-900">
                            Costo Total Estimado: $
                            {calculateShipmentCost(formData.selectedPackages, formData.type).toFixed(2)}
                          </p>
                          <p className="text-sm text-blue-700">
                            {formData.selectedPackages.length} paquete(s) seleccionado(s)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={formData.selectedPackages.length === 0}>
                      {editingShipment ? "Actualizar" : "Crear Envío"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar envíos..."
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
                <SelectItem value="at_port">En Puerto</SelectItem>
                <SelectItem value="in_transit">En Tránsito</SelectItem>
                <SelectItem value="at_destination">En Destino</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="air">Aéreo</SelectItem>
                <SelectItem value="sea">Marítimo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Shipments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Paquetes</TableHead>
                <TableHead>Costo Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(shipment.type)}
                      <span className="capitalize">{shipment.type === "air" ? "Aéreo" : "Marítimo"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{shipment.originWarehouse} →</p>
                      <p>{shipment.destinationWarehouse}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Salida: {shipment.departureDate}</p>
                      <p>Llegada: {shipment.arrivalDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shipment.packages.length} paquete(s)</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${shipment.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(shipment)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Mostrando {filteredShipments.length} de {shipments.length} envíos
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
