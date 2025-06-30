"use client";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useCartStore } from "@/context/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Minus,
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const createOrder = useCreateOrder();

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const discount = Math.round(subtotal * 0.075); // 7.5% discount simulation
  const tax = Math.round((subtotal - discount) * 0.194); // ~19.4% tax
  const total = subtotal - discount + tax + shipping;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-gray-500 hover:text-gray-700"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-600 font-medium">
              Card
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="lg:col-span-3">
              <h1 className="text-2xl font-bold mb-8">Shopping Card</h1>

              {/* Empty State Card */}
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-16 px-8">
                  {/* Shopping Cart Icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-xs font-bold">
                        0
                      </span>
                    </div>
                  </div>

                  {/* Main Message */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-500 text-center mb-8 max-w-md">
                    Looks like you haven't added any items to your cart yet.
                    Start shopping to fill it up!
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <Button
                      asChild
                      className="flex-1 bg-[#9C6644] hover:bg-[#824f3b]"
                    >
                      <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Start Shopping
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="bg-gray-50 rounded-t-lg p-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wide">
                  <div className="col-span-6">PRODUCTS</div>
                  <div className="col-span-2 text-center">PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-center">SUB-TOTAL</div>
                </div>
              </div>

              {/* Products List */}
              <div className="border border-t-0 rounded-b-lg">
                {items.map((item, index) => {
                  const imageUrl = `http://localhost:5000${item.product.imageUrl}`;
                  const itemSubtotal = item.product.price * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className={`p-4 ${
                        index !== items.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-2">
                              {item.product.name}
                            </h3>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-medium">
                            ${item.product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-1 h-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1 h-8"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 text-center">
                          <span className="font-medium">
                            ${itemSubtotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Return to Shop Button */}
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    RETURN TO SHOP
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Cart Totals */}
        {items.length > 0 && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Cart Totals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-total</span>
                  <span className="font-normal">
                    {subtotal.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-normal">
                  <span>Total</span>
                  <span>
                    {subtotal.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </span>
                </div>

                <Button
                  onClick={() => createOrder.mutate()}
                  className="w-full bg-[#9C6644] hover:bg-[#824f3b] text-white font-medium py-3"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? "Procesando..." : "FINALIZAR COMPRA"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
