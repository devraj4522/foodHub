import { useQuery } from "react-query";
import { getRestaurants } from "@/utils/restaurants/restaurants";

// fetch restaurant products
export const useFetchProducts = (restaurantId: string) => {
    return useQuery('products', () => getRestaurants());
}