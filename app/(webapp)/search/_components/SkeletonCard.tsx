import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export function SkeletonCard() {
  return (
    <Card className="mb-4">
      <div className="flex">
        <Skeleton className="w-1/4 h-40 rounded-l-lg" />
        <div className="p-4 flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </Card>
  );
}