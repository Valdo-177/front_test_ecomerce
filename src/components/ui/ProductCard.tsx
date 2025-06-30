"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/useAuthStore";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  originalPrice?: number; // Para mostrar precio tachado si existe
}

export const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const ImageUrl = `http://localhost:5000${product.imageUrl}`;
  const { isAuthenticated, setOpenLoginDialog } = useAuthStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      setOpenLoginDialog(true);
      return;
    }
  };


  return (
    <Link href={`/product/${product.id}`} className="block">
      <div
        className="border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col bg-white relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={ImageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 rounded-full p-0 bg-white shadow-lg hover:bg-gray-50 hover:scale-110 transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>

            <Link href={`/product/${product.id}`}>
              <Button
                size="sm"
                className="w-10 h-10 rounded-full p-0 bg-[#9C6644] hover:bg-[#824f3b] shadow-lg hover:scale-110 transition-all"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-primary font-bold text-sm">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            % OFF
          </div>
        )}
      </div>
    </Link>
  );
};
