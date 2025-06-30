"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/useAuthStore";
import { useCartStore } from "@/context/useCartStore";
import { toast } from "sonner";
import type { Product } from "@/types";

export const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = `http://localhost:5000${product.imageUrl}`;
  const { isAuthenticated, setOpenLoginDialog, user } = useAuthStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const isAdminOrSeller = user?.role === "ADMIN" || user?.role === "SELLER";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      setOpenLoginDialog(true);
      return;
    }

    if (product) {
      addToCart(product, 1);
    } else {
      toast("Failed to add product to cart. Please try again later.");
    }
  };

  return (
    <div
      className="border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col bg-white relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <span className="text-primary font-bold text-sm">
          ${product.price.toLocaleString()}
        </span>
      </div>

      <div
        className={`z-10 absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        {!isAdminOrSeller && (
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full p-0 bg-white shadow-lg hover:bg-gray-50 hover:scale-110 transition-all"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        )}

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
  );
};
