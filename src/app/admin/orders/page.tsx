"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAllOrders, useDeleteOrder, useUpdateOrderStatus } from "@/hooks/useCreateOrder"
import { Package, Trash2, Truck, Clock, ShoppingBag } from "lucide-react"
import { OrderSkeleton } from "@/components/ui/OrderSkeleton"

const OrdersPage = () => {
  const { data, isLoading } = useAllOrders()
  const deleteOrder = useDeleteOrder()
  const updateStatus = useUpdateOrderStatus()

  // Función para verificar si han pasado más de 60 minutos
  const isOrderExpired = (createdAt: string): boolean => {
    const orderDate = new Date(createdAt)
    const now = new Date()
    const diffInMinutes = (now.getTime() - orderDate.getTime()) / (1000 * 60)
    return diffInMinutes > 60
  }

  // Función para obtener el tiempo restante
  const getTimeRemaining = (createdAt: string): string => {
    const orderDate = new Date(createdAt)
    const now = new Date()
    const diffInMinutes = 60 - (now.getTime() - orderDate.getTime()) / (1000 * 60)

    if (diffInMinutes <= 0) return "Expirado"

    const hours = Math.floor(diffInMinutes / 60)
    const minutes = Math.floor(diffInMinutes % 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m restantes`
    }
    return `${minutes}m restantes`
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
      PROCESSING: { label: "Procesando", color: "bg-blue-100 text-blue-800" },
      SHIPPED: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
      DELIVERED: { label: "Entregado", color: "bg-green-100 text-green-800" },
      CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING

    return <Badge className={config.color}>{config.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Órdenes</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Órdenes</h1>
            <Badge variant="secondary" className="ml-2">
              {data?.orders?.length || 0} órdenes
            </Badge>
          </div>
        </div>

        {/* Orders List */}
        {!data?.orders || data.orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay órdenes</h3>
              <p className="text-gray-500 text-center">Aún no se han realizado órdenes en el sistema.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data.orders.map((order: any) => {
              // Solo aplicar lógica de tiempo si existe createdAt
              const isExpired = order.createdAt ? isOrderExpired(order.createdAt) : false
              const timeRemaining = order.createdAt ? getTimeRemaining(order.createdAt) : ""

              return (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Orden #{order.id.toString().padStart(6, "0")}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        {!isExpired && order.createdAt && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {timeRemaining}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <strong>ID:</strong> {order.id}
                        </p>
                        <p>
                          <strong>Status:</strong> {order.status}
                        </p>
                        {order.createdAt && (
                          <p>
                            <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        {order.user && (
                          <>
                            <p>
                              <strong>Usuario:</strong> {order.user.email}
                            </p>
                            {order.user.profile?.fullName && (
                              <p>
                                <strong>Nombre:</strong> {order.user.profile.fullName}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Productos:</h4>
                      <ul className="ml-4 list-disc space-y-1">
                        {order?.items?.map((item: any, i: number) => (
                          <li key={i} className="text-sm">
                            Product ID: {item.productId}, Qty: {item.quantity}
                            {item.product?.name && ` - ${item.product.name}`}
                            {item.product?.price && ` ($${item.product.price})`}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {isExpired ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <Clock className="w-4 h-4" />
                            <span>Período de edición expirado</span>
                          </div>
                        ) : order.createdAt ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Clock className="w-4 h-4" />
                            <span>Editable por {timeRemaining}</span>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex gap-2">
                        {/* Update Status Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateStatus.mutate({ id: order.id, status: "SHIPPED" })}
                                disabled={isExpired || order.status === "SHIPPED" || updateStatus.isPending}
                                className="flex items-center gap-2"
                              >
                                <Truck className="w-4 h-4" />
                                {order.status === "SHIPPED" ? "Enviado" : "Marcar como Enviado"}
                              </Button>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isExpired
                              ? "No se puede actualizar después de 60 minutos"
                              : order.status === "SHIPPED"
                                ? "La orden ya está marcada como enviada"
                                : "Marcar orden como enviada"}
                          </TooltipContent>
                        </Tooltip>

                        {/* Delete Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={isExpired || deleteOrder.isPending}
                                    className="flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Eliminar orden?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción no se puede deshacer. La orden #{order.id.toString().padStart(6, "0")}{" "}
                                      será eliminada permanentemente.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteOrder.mutate(order.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isExpired
                              ? "No se puede eliminar después de 60 minutos"
                              : "Eliminar orden permanentemente"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default OrdersPage
