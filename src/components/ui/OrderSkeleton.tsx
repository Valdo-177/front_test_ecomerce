import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const OrderSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Info Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        {/* Items Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        <Skeleton className="h-px w-full" />

        {/* Actions Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
