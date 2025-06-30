"use client";

import { useState, useMemo } from "react";
import { useAllProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/input";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";

const ProductsPage = () => {
  const { data, isLoading, error } = useAllProducts();
  const [search, setSearch] = useState("");

  const allProducts = useMemo(() => {
    if (!data) return [];

    return data.flatMap((category) => category.products);
  }, [data]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allProducts, search]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Failed to fetch products.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-sm text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;