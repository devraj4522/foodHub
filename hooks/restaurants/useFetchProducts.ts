import { useQuery } from "react-query";
import { getProductsByRestaurant } from "@/utils/products/products";

// fetch restaurant products
export const useFetchProducts = (restaurantId: string) => {
    return useQuery('products', () => getProductsByRestaurant(restaurantId));
}