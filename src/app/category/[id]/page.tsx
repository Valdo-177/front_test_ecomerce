"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useCategoryProducts } from "@/hooks/useCategories";
import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";

const CategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = Number(params.id);
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useCategoryProducts(categoryId, page, 10);

  const handlePageChange = (newPage: number) => {
    router.push(`/category/${categoryId}?page=${newPage}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-10 py-10">
        {/* Simular 3 categorías con skeletons */}
        {Array.from({ length: 3 }).map((_, categoryIndex) => (
          <div key={categoryIndex} className="max-w-[85rem] mx-auto">
            <div className="h-7 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) return <p>Error loading products.</p>;

  return (
    <div className="max-w-[85rem] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{data.category.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: data.pagination.totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded ${
              data.pagination.page === i + 1
                ? "bg-[#9C6644] hover:bg-[#824f3b] text-white"
                : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
