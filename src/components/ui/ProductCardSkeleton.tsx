import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col bg-white">
      <Skeleton className="w-full sm:w-[290px] h-48 mb-4 rounded-md" />

      <Skeleton className="h-4 w-3/4 mb-2" />

      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      <Skeleton className="h-5 w-20 mt-auto" />
    </div>
  );
};
