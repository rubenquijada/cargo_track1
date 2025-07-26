"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Package, Truck, MapPin } from "lucide-react"

interface ClientPackage {
  id: string
  trackingNumber: string
  description: string
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
  cubicFeet: number
  status: "received" | "in_transit" | "available" | "dispatched"
  warehouse: string
  client: string
  registeredAt: string
  shipmentCode?: string
  estimatedArrival?: string
}

interface ClientPackageViewProps {
  userRole: "employee" | "client"
}

export function ClientPackageView({ userRole }: ClientPackageViewProps) {
  const [packages] = useState<ClientPackage[]>([
    {
      id: "1",
      trackingNumber: "CT2024001234",
      description: "Electrónicos - Smartphone",
      dimensions: { length: 12, width: 8, height: 6 },
      weight: 2.5,
      cubicFeet: 0.33,
      status: "available",
      warehouse: "LGU-001",
      client: "Juan Pérez",
      registeredAt: "2024-01-20",
      shipmentCode: "ENV-2024-001",
      estimatedArrival: "2024-01-25",
    },
    {
      id: "2",
      trackingNumber: "CT2024001235",
      description: "Ropa - Zapatos deportivos",
      dimensions: { length: 16, width: 12, height: 8 },
      weight: 4.2,
      cubicFeet: 0.89,
      status: "in_transit",
      warehouse: "DOR-001",
      client: "Juan Pérez",
      registeredAt: "2024-01-19",
      shipmentCode: "ENV-2024-002",
      estimatedArrival: "2024-01-26",
    },
    {
      id: "3",
      trackingNumber: "CT2024001236",
      description: "Libros - Novelas",
      dimensions: { length: 10, width: 10, height: 4 },
      weight: 1.8,
      cubicFeet: 0.23,
      status: "dispatched",
      warehouse: "NES-001",
      client: "Juan Pérez",
      registeredAt: "2024-01-18",
      shipmentCode: "ENV-2024-003",
    },
    {
      id: "4",
      trackingNumber: "CT2024001237",
      description: "Electrónicos - Tablet",
      dimensions: { length: 14, width: 10, height: 2 },
      weight: 1.5,
      cubicFeet: 0.16,
      status: "received",
      warehouse: "ORL-001",
      client: "María González",
      registeredAt: "2024-01-21",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedClient, setSelectedClient] = useState<string>("all")

  const filteredPackages = packages.filter((pkg) => {
    // Si es cliente, solo mostrar sus paquetes
    const clientFilter = userRole === "client" ? pkg.client === "Juan Pérez" : true

    const matchesSearch = `${pkg.trackingNumber} ${pkg.description} ${pkg.client}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || pkg.status === selectedStatus
    const matchesClient = selectedClient === "all" || pkg.client === selectedClient
    return clientFilter && matchesSearch && matchesStatus && matchesClient
  })

  const getStatusBadge = (status: ClientPackage["status"]) => {
    const variants = {
      received: "bg-blue-600",
      in_transit: "bg-orange-600",
      available: "bg-green-600",
      dispatched: "bg-gray-600",
    }
    const labels = {
      received: "Recibido en Almacén",
      in_transit: "En Tránsito",
      available: "Disponible para Retiro",
      dispatched: "Entregado",
    }
    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const getStatusIcon = (status: ClientPackage["status"]) => {
    switch (status) {
      case "received":
        return <Package className="h-4 w-4 text-blue-600" />
      case "in_transit":
        return <Truck className="h-4 w-4 text-orange-600" />
      case "available":
        return <MapPin className="h-4 w-4 text-green-600" />
      case "dispatched":
        return <Package className="h-4 w-4 text-gray-600" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTrackingSteps = (status: ClientPackage["status"]) => {
    const steps = [
      { key: "received", label: "Recibido", completed: true },
      { key: "in_transit", label: "En Tránsito", completed: status !== "received" },
      { key: "available", label: "Disponible", completed: status === "available" || status === "dispatched" },
      { key: "dispatched", label: "Entregado", completed: status === "dispatched" },
    ]
    return steps
  }

  const uniqueClients = [...new Set(packages.map((pkg) => pkg.client))]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{userRole === "client" ? "Mis Paquetes" : "Vista de Paquetes por Cliente"}</CardTitle>
          <CardDescription>
            {userRole === "client"
              ? "Rastrea el estado de tus paquetes en tiempo real"
              : "Visualiza los paquetes filtrados por cliente"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por tracking o descripción..."
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
                <SelectItem value="dispatched">Entregado</SelectItem>
              </SelectContent>
            </Select>
            {userRole === "employee" && (
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los clientes</SelectItem>
                  {uniqueClients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Packages Grid/Table */}
          <div className="space-y-4">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(pkg.status)}
                    <div>
                      <h3 className="font-semibold">{pkg.trackingNumber}</h3>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                      {userRole === "employee" && <p className="text-sm text-gray-500">Cliente: {pkg.client}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(pkg.status)}
                    {pkg.estimatedArrival && pkg.status === "in_transit" && (
                      <p className="text-sm text-gray-500 mt-1">Llegada estimada: {pkg.estimatedArrival}</p>
                    )}
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dimensiones</p>
                    <p className="text-sm">
                      {pkg.dimensions.length}" × {pkg.dimensions.width}" × {pkg.dimensions.height}"
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Peso</p>
                    <p className="text-sm">{pkg.weight} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Volumen</p>
                    <p className="text-sm">{pkg.cubicFeet.toFixed(2)} ft³</p>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Estado del Envío</p>
                  <div className="flex items-center space-x-4">
                    {getTrackingSteps(pkg.status).map((step, index) => (
                      <div key={step.key} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${step.completed ? "bg-green-600" : "bg-gray-300"}`} />
                        <span
                          className={`ml-2 text-sm ${step.completed ? "text-green-600 font-medium" : "text-gray-500"}`}
                        >
                          {step.label}
                        </span>
                        {index < getTrackingSteps(pkg.status).length - 1 && (
                          <div className={`w-8 h-0.5 mx-2 ${step.completed ? "bg-green-600" : "bg-gray-300"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Almacén: {pkg.warehouse}</span>
                    {pkg.shipmentCode && <span>Envío: {pkg.shipmentCode}</span>}
                    <span>Registrado: {pkg.registeredAt}</span>
                  </div>
                  {pkg.status === "available" && userRole === "client" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Programar Retiro
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron paquetes</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">Mostrando {filteredPackages.length} paquetes</p>
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
