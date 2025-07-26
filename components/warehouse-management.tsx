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
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react"

interface Warehouse {
  id: string
  code: string
  name: string
  address: {
    line1: string
    line2?: string
    country: string
    state: string
    city: string
    postalCode: string
    phone: string
  }
  type: "origin" | "destination"
  status: "active" | "inactive"
}

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "1",
      code: "ORL-001",
      name: "Orlando Warehouse",
      address: {
        line1: "1234 International Dr",
        line2: "Suite 100",
        country: "Estados Unidos",
        state: "Florida",
        city: "Orlando",
        postalCode: "32819",
        phone: "+1 (407) 555-0123",
      },
      type: "origin",
      status: "active",
    },
    {
      id: "2",
      code: "DOR-001",
      name: "Doral Warehouse",
      address: {
        line1: "5678 NW 36th St",
        country: "Estados Unidos",
        state: "Florida",
        city: "Doral",
        postalCode: "33166",
        phone: "+1 (305) 555-0456",
      },
      type: "origin",
      status: "active",
    },
    {
      id: "3",
      code: "LGU-001",
      name: "La Guaira Warehouse",
      address: {
        line1: "Av. Principal Puerto",
        line2: "Zona Industrial",
        country: "Venezuela",
        state: "Vargas",
        city: "La Guaira",
        postalCode: "1160",
        phone: "+58 (212) 555-0789",
      },
      type: "destination",
      status: "active",
    },
    {
      id: "4",
      code: "NES-001",
      name: "Nueva Esparta Warehouse",
      address: {
        line1: "Calle Comercio",
        country: "Venezuela",
        state: "Nueva Esparta",
        city: "Porlamar",
        postalCode: "6301",
        phone: "+58 (295) 555-0321",
      },
      type: "destination",
      status: "active",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    line1: "",
    line2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    phone: "",
    type: "origin" as Warehouse["type"],
  })

  const filteredWarehouses = warehouses.filter((warehouse) => {
    const matchesSearch = `${warehouse.name} ${warehouse.code} ${warehouse.address.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || warehouse.type === selectedType
    return matchesSearch && matchesType
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const warehouseData: Warehouse = {
      id: editingWarehouse?.id || Date.now().toString(),
      code: formData.code,
      name: formData.name,
      address: {
        line1: formData.line1,
        line2: formData.line2,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
      },
      type: formData.type,
      status: "active",
    }

    if (editingWarehouse) {
      setWarehouses(warehouses.map((w) => (w.id === editingWarehouse.id ? warehouseData : w)))
    } else {
      setWarehouses([...warehouses, warehouseData])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      phone: "",
      type: "origin",
    })
    setEditingWarehouse(null)
  }

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse)
    setFormData({
      code: warehouse.code,
      name: warehouse.name,
      line1: warehouse.address.line1,
      line2: warehouse.address.line2 || "",
      country: warehouse.address.country,
      state: warehouse.address.state,
      city: warehouse.address.city,
      postalCode: warehouse.address.postalCode,
      phone: warehouse.address.phone,
      type: warehouse.type,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (warehouseId: string) => {
    setWarehouses(warehouses.filter((w) => w.id !== warehouseId))
  }

  const getTypeBadge = (type: Warehouse["type"]) => {
    return type === "origin" ? (
      <Badge className="bg-blue-600">Origen</Badge>
    ) : (
      <Badge className="bg-green-600">Destino</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestión de Almacenes</CardTitle>
              <CardDescription>Administra los almacenes de origen y destino</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Almacén
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingWarehouse ? "Editar Almacén" : "Nuevo Almacén"}</DialogTitle>
                  <DialogDescription>
                    {editingWarehouse
                      ? "Modifica los datos del almacén"
                      : "Completa los datos para registrar un nuevo almacén"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Código</Label>
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          placeholder="ORL-001"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Orlando Warehouse"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: Warehouse["type"]) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="origin">Origen (USA)</SelectItem>
                          <SelectItem value="destination">Destino (Venezuela)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Dirección</h4>
                      <div className="space-y-2">
                        <Label htmlFor="line1">Línea 1</Label>
                        <Input
                          id="line1"
                          value={formData.line1}
                          onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                          placeholder="1234 Main Street"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="line2">Línea 2 (Opcional)</Label>
                        <Input
                          id="line2"
                          value={formData.line2}
                          onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                          placeholder="Suite 100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">País</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="Estados Unidos"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="Florida"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Orlando"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            placeholder="32819"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (407) 555-0123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">{editingWarehouse ? "Actualizar" : "Crear Almacén"}</Button>
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
                  placeholder="Buscar almacenes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="origin">Origen</SelectItem>
                <SelectItem value="destination">Destino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Warehouses Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWarehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">{warehouse.code}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm">
                          {warehouse.address.city}, {warehouse.address.state}
                        </p>
                        <p className="text-xs text-gray-500">{warehouse.address.country}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(warehouse.type)}</TableCell>
                  <TableCell>{warehouse.address.phone}</TableCell>
                  <TableCell>
                    <Badge variant={warehouse.status === "active" ? "default" : "secondary"}>
                      {warehouse.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(warehouse)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(warehouse.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
