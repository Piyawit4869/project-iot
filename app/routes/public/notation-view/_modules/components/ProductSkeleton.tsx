import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-sm border-0 bg-card">
      <div className="aspect-square relative">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12 rounded-lg" />
          <Skeleton className="h-5 w-12 rounded-lg" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 flex-1 rounded-xl" />
          <Skeleton className="h-8 flex-1 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
