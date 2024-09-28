import { notFound } from "next/navigation";
import { getMenuItemById } from "@/actions/food";
import FoodItemDetails from "./_components/Food/FoodItemDetails";

export default async function FoodItemPage({params}: {params: {id: string}}) {
  if (!params.id || typeof params.id !== 'string') {
    return notFound();
  }
  const foodItem = await getMenuItemById(params.id);
  return (
    <div>
      <FoodItemDetails foodItem={foodItem} />
    </div>
  );
}
