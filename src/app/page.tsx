import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10">
      <div className="max-w-[85rem]">
        <h1 className="text-2xl font-bold mb-8">Explore our Products</h1>
        <ProductGrid />
      </div>
    </main>
  );
}