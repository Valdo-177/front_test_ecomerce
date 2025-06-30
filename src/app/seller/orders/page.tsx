"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDeleteOrder, useMyOrders, useUpdateOrderStatus } from "@/hooks/useCreateOrder"
import { Package, Trash2, Truck, Clock, ShoppingBag } from "lucide-react"
import { OrderSkeleton } from "@/components/ui/OrderSkeleton"

const SellerOrdersPage = () => {
  const { data, isLoading } = useMyOrders()
  const deleteOrder = useDeleteOrder()
  const updateStatus = useUpdateOrderStatus()

  const isOrderExpired = (createdAt: string): boolean => {
    const diff = (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60)
    return diff > 60
  }

  const getTimeRemaining = (createdAt: string): string => {
    const diff = 60 - (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60)
    return diff <= 0 ? "Expirado" : `${Math.floor(diff)}m restantes`
  }

  const getStatusBadge = (status: string) => {
    const map = {
      PENDING: "bg-yellow-100 text-yellow-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
    }
    const labelMap = {
      PENDING: "Pendiente",
      SHIPPED: "Enviado",
      DELIVERED: "Entregado",
    }
    return <Badge className={map[status] || ""}>{labelMap[status] || status}</Badge>
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          Tus Órdenes Recibidas
        </h1>
        {Array.from({ length: 5 }).map((_, i) => <OrderSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          Tus Órdenes Recibidas
          <Badge variant="secondary">{data?.orders?.length || 0}</Badge>
        </h1>

        {data?.orders?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Package className="w-10 h-10 mx-auto mb-2" />
              Aún no tienes órdenes
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data?.orders?.map((order: any) => {
              const expired = order.createdAt ? isOrderExpired(order.createdAt) : false
              const timeLeft = order.createdAt ? getTimeRemaining(order.createdAt) : ""

              return (
                <Card key={order.id}>
                  <CardHeader className="pb-4 flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Orden #{order.id.toString().padStart(6, "0")}
                    </CardTitle>
                    <div className="flex gap-2">
                      {getStatusBadge(order.status)}
                      {!expired && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {timeLeft}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <strong>Cliente:</strong> {order.user?.profile?.fullName || order.user?.email}
                    </div>

                    <Separator />

                    <div>
                      <strong>Productos:</strong>
                      <ul className="ml-4 list-disc text-sm mt-2">
                        {order?.items.map((item: any, i: number) => (
                          <li key={i}>
                            {item.product?.name || "Producto"} - {item.quantity} unid. (${item.product?.price})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {expired ? "Edición expirada" : `Editable por ${timeLeft}`}
                      </div>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus.mutate({ id: order.id, status: "SHIPPED" })}
                              disabled={expired || order.status === "SHIPPED"}
                            >
                              <Truck className="w-4 h-4 mr-1" />
                              {order.status === "SHIPPED" ? "Enviado" : "Marcar Enviado"}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {expired ? "No se puede editar" : "Marcar como enviado"}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteOrder.mutate(order.id)}
                              disabled={expired}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar orden</TooltipContent>
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

export default SellerOrdersPage
