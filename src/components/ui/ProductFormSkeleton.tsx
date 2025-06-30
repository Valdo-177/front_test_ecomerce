import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export const ProductFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Search Skeleton */}
      <Skeleton className="h-10 w-80" />

      {/* Table Skeleton */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
                <div className="flex gap-2 justify-center">
                  <Skeleton className="w-8 h-8" />
                  <Skeleton className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
