"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProductById } from "@/hooks/useProducts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import { ProductDetailSkeleton } from "@/components/ui/ProductDetailSkeleton";
import { useAuthStore } from "@/context/useAuthStore";

const ProductPage = () => {
  const params = useParams();
  const productId = Number(params.id);
  const { data: product, isLoading, error } = useProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, setOpenLoginDialog } = useAuthStore();

  const ImageUrl = `http://localhost:5000${product?.imageUrl}`;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setOpenLoginDialog(true);
      return;
    }
    console.log("Added to cart:", { productId, quantity });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { productId, quantity });
  };

  if (isLoading) return <ProductDetailSkeleton />;

  if (error || !product)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-500">
          Product not found or failed to load.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 h-[90dvh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Imagen del producto */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={ImageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          {/* 
          <div className="flex gap-2">
            <div className="w-20 h-20 border-2 border-orange-500 rounded-lg overflow-hidden">
              <Image
                src={ImageUrl || "/placeholder.svg"}
                alt={product.name}
                width={80}
                height={80}
                className="object-contain w-full h-full p-1"
              />
            </div>
          </div> */}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Rating simulado y título */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4 font-normal">
              {product.description}
            </p>
          </div>

          {/* Información del producto */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">SKU:</span>
              <span className="ml-2 font-medium">
                #{product.id.toString().padStart(6, "0")}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Availability:</span>
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                className="ml-2 font-normal"
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>
              <span className="ml-2 font-normal">{product.category.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Seller:</span>
              <span className="ml-2 font-normal">
                {product.seller.profile.fullName}
              </span>
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-normal text-[#9C6644]">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <Separator />

          {/* Controles de cantidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-normal">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 font-normal"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="px-3 font-normal"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#9C6644] hover:bg-[#824f3b] text-white"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                ADD TO CART
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="flex-1 bg-transparent"
                disabled={product.stock === 0}
              >
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
