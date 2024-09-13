import { useQuery } from "react-query";
import { getProduct } from "@/utils/products/products";

export const useGetProduct = (productId: string) => {
    const { data, isLoading, error } = useQuery(['product', productId], () => getProduct(productId));
    return { data, isLoading, error };
}