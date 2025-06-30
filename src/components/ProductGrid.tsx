"use client";

import { useAllProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ui/ProductCard";
import type { Category } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCardSkeleton } from "./ui/ProductCardSkeleton";

export const ProductGrid = () => {
  const { data, isLoading, error } = useAllProducts();

  if (isLoading) {
    return (
      <div className="space-y-10">
        {/* Simular 3 categorías con skeletons */}
        {Array.from({ length: 3 }).map((_, categoryIndex) => (
          <div key={categoryIndex}>
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

  if (error) return <p>Failed to fetch products.</p>;

  return (
    <div className="space-y-10">
      {data.map((category: Category) => {
        const maxProducts = 8; // 2 filas x 4 productos
        const visibleProducts = category.products.slice(0, maxProducts);
        const hasMoreProducts = category.products.length > maxProducts;
        const remainingCount = category.products.length - maxProducts;

        return (
          <div key={category.id}>
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>

            {category.products.length === 0 ? (
              <p className="text-sm text-gray-500">
                No products in this category.
              </p>
            ) : (
              <div className="relative">
                {/* Grid de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleProducts.map((product, index) => {
                    // Si es el último producto de la segunda fila y hay más productos
                    const isLastInSecondRow = index === 7 && hasMoreProducts;

                    return (
                      <div key={product.id} className="relative">
                        <ProductCard product={product} />

                        {/* Overlay "See more" en el último producto si hay más */}
                        {isLastInSecondRow && (
                          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-xs">
                            <Link
                              href={`/category/${category.id}`}
                              className="bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                            >
                              <span>+{remainingCount} more</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Enlace "See more" alternativo */}
                {hasMoreProducts && (
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/category/${category.id}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 transition-colors"
                    >
                      See all {category.products.length} products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// "use client";

// import { useAllProducts } from "@/hooks/useProducts";
// import { ProductCard } from "./ui/ProductCard";
// import { Category } from "@/types";

// export const ProductGrid = () => {
//   const { data, isLoading, error } = useAllProducts();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Failed to fetch products.</p>;

//   return (
//     <div className="space-y-10">
//       {data.map((category: Category) => (
//         <div key={category.id}>
//           <h2 className="text-xl font-bold mb-4">{category.name}</h2>
//           {category.products.length === 0 ? (
//             <p className="text-sm text-gray-500">
//               No products in this category.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//               {category.products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
