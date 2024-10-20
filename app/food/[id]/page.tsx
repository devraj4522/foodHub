import { notFound } from "next/navigation";
import { getMenuItemById } from "@/actions/food";
import FoodItemDetailsClient from "./_components/FoodItemDetailsClient";

export default async function FoodItemPage({params}: {params: {id: string}}) {
  if (!params.id || typeof params.id !== 'string') {
    return notFound();
  }
  const foodItem = await getMenuItemById(params.id);
  return <FoodItemDetailsClient foodItem={foodItem} />
}
