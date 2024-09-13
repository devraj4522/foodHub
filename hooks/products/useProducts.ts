import { useQuery } from "react-query";
import { getProducts } from "@/utils/products/products";

export const useProducts = () => {
    const { data, isLoading, error } = useQuery('products', getProducts)
    return {data, isLoading, error}
}