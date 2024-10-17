import { notFound } from "next/navigation";
import { getMenuItemById } from "@/actions/food";
import FoodItemDetails from "./_components/Food/FoodItemDetails";
import { Suspense } from "react";

export default async function FoodItemPage({params}: {params: {id: string}}) {
  if (!params.id || typeof params.id !== 'string') {
    return notFound();
  }
  const foodItem = await getMenuItemById(params.id);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>} >
        <FoodItemDetails foodItem={foodItem} />
      </Suspense>
    </div>
  );
}
