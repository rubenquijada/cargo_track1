"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
} from "@/components/ui/dialog"
import { Search, Download, CreditCard, Eye } from "lucide-react"

interface Invoice {
  id: string
  invoiceNumber: string
  client: string
  status: "generated" | "paid"
  totalAmount: number
  paymentMethod?: string
  packageCount: number
  packages: {
    id: string
    description: string
    calculatedAmount: number
  }[]
  shipmentCode: string
  generatedAt: string
  paidAt?: string
}

interface InvoiceManagementProps {
  userRole: "admin" | "employee" | "client"
}

export function InvoiceManagement({ userRole }: InvoiceManagementProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      client: "Juan Pérez",
      status: "paid",
      totalAmount: 125.5,
      paymentMethod: "Tarjeta de Crédito",
      packageCount: 2,
      packages: [
        { id: "CT2024001234", description: "Electrónicos - Smartphone", calculatedAmount: 45.0 },
        { id: "CT2024001235", description: "Ropa - Zapatos deportivos", calculatedAmount: 80.5 },
      ],
      shipmentCode: "ENV-2024-001",
      generatedAt: "2024-01-20",
      paidAt: "2024-01-22",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      client: "María González",
      status: "generated",
      totalAmount: 89.75,
      packageCount: 1,
      packages: [{ id: "CT2024001236", description: "Libros - Novelas", calculatedAmount: 89.75 }],
      shipmentCode: "ENV-2024-002",
      generatedAt: "2024-01-22",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      client: "Juan Pérez",
      status: "generated",
      totalAmount: 67.25,
      packageCount: 1,
      packages: [{ id: "CT2024001237", description: "Electrónicos - Tablet", calculatedAmount: 67.25 }],
      shipmentCode: "ENV-2024-003",
      generatedAt: "2024-01-23",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  const filteredInvoices = invoices.filter((invoice) => {
    // Si es cliente, solo mostrar sus facturas
    const clientFilter = userRole === "client" ? invoice.client === "Juan Pérez" : true

    const matchesSearch = `${invoice.invoiceNumber} ${invoice.client} ${invoice.shipmentCode}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus
    return clientFilter && matchesSearch && matchesStatus
  })

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsPaymentDialogOpen(true)
  }

  const processPayment = () => {
    if (selectedInvoice && paymentMethod) {
      setInvoices(
        invoices.map((inv) =>
          inv.id === selectedInvoice.id
            ? {
                ...inv,
                status: "paid" as const,
                paymentMethod,
                paidAt: new Date().toISOString().split("T")[0],
              }
            : inv,
        ),
      )
      setIsPaymentDialogOpen(false)
      setPaymentMethod("")
      setSelectedInvoice(null)
    }
  }

  const viewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDetailDialogOpen(true)
  }

  const getStatusBadge = (status: Invoice["status"]) => {
    return status === "paid" ? (
      <Badge className="bg-green-600">Pagada</Badge>
    ) : (
      <Badge className="bg-orange-600">Pendiente</Badge>
    )
  }

  const canPayInvoice = userRole === "client"
  const canViewAll = userRole === "admin" || userRole === "employee"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{userRole === "client" ? "Mis Facturas" : "Gestión de Facturas"}</CardTitle>
              <CardDescription>
                {userRole === "client"
                  ? "Visualiza y paga tus facturas pendientes"
                  : "Administra las facturas del sistema"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar facturas..."
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
                <SelectItem value="generated">Pendientes</SelectItem>
                <SelectItem value="paid">Pagadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoices Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                {canViewAll && <TableHead>Cliente</TableHead>}
                <TableHead>Envío</TableHead>
                <TableHead>Paquetes</TableHead>
                <TableHead>Monto Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  {canViewAll && <TableCell>{invoice.client}</TableCell>}
                  <TableCell>{invoice.shipmentCode}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.packageCount} paquete(s)</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${invoice.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Generada: {invoice.generatedAt}</p>
                      {invoice.paidAt && <p className="text-green-600">Pagada: {invoice.paidAt}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => viewInvoiceDetails(invoice)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {canPayInvoice && invoice.status === "generated" && (
                        <Button
                          size="sm"
                          onClick={() => handlePayInvoice(invoice)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pagar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Mostrando {filteredInvoices.length} de {invoices.length} facturas
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

      {/* Invoice Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de Factura</DialogTitle>
            <DialogDescription>{selectedInvoice?.invoiceNumber}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Información General</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Cliente:</span> {selectedInvoice.client}
                    </p>
                    <p>
                      <span className="font-medium">Envío:</span> {selectedInvoice.shipmentCode}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {getStatusBadge(selectedInvoice.status)}
                    </p>
                    <p>
                      <span className="font-medium">Generada:</span> {selectedInvoice.generatedAt}
                    </p>
                    {selectedInvoice.paidAt && (
                      <p>
                        <span className="font-medium">Pagada:</span> {selectedInvoice.paidAt}
                      </p>
                    )}
                    {selectedInvoice.paymentMethod && (
                      <p>
                        <span className="font-medium">Método de Pago:</span> {selectedInvoice.paymentMethod}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Resumen de Costos</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Cantidad de Paquetes:</span> {selectedInvoice.packageCount}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> ${selectedInvoice.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Detalle de Paquetes</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">{pkg.id}</TableCell>
                        <TableCell>{pkg.description}</TableCell>
                        <TableCell>${pkg.calculatedAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Cerrar
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
            <DialogDescription>
              Factura: {selectedInvoice?.invoiceNumber} - ${selectedInvoice?.totalAmount.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Método de Pago</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                  <SelectItem value="debit_card">Tarjeta de Débito</SelectItem>
                  <SelectItem value="bank_transfer">Transferencia Bancaria</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Efectivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={processPayment} disabled={!paymentMethod} className="bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Procesar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
