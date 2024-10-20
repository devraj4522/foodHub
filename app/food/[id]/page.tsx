import { notFound } from "next/navigation";
import { getMenuItemById } from "@/actions/food";
import FoodItemDetails from "./_components/Food/FoodItemDetails";
import { Suspense } from "react";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default async function FoodItemPage({params}: {params: {id: string}}) {
  if (!params.id || typeof params.id !== 'string') {
    return notFound();
  }
  const foodItem = await getMenuItemById(params.id);
  return (
    <div>
      <Suspense fallback={
         <Card className="w-full space-y-5 p-4" radius="lg">
         <Skeleton className="rounded-lg">
           <div className="h-56 rounded-lg bg-default-300"></div>
         </Skeleton>
         <div className="space-y-3">
           <Skeleton className="w-3/5 rounded-lg">
             <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
           </Skeleton>
           <Skeleton className="w-4/5 rounded-lg">
             <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
           </Skeleton>
           <Skeleton className="w-2/5 rounded-lg">
             <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
           </Skeleton>
         </div>
         <div className="flex items-center justify-between">
           <Skeleton className="w-2/5 rounded-lg">
             <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
           </Skeleton>
           <Skeleton className="w-1/4 rounded-lg">
             <div className="h-8 w-1/4 rounded-lg bg-default-300"></div>
           </Skeleton>
         </div>
       </Card>
      } >
        <FoodItemDetails foodItem={foodItem} />
      </Suspense>
    </div>
  );
}
