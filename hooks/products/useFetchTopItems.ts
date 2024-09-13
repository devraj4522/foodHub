import { useQuery } from "react-query";
import { getTopItems } from "@/utils/products/products";

export const useFetchTopItems = () => {
    const { data, isLoading, error } = useQuery('topItems', getTopItems);
    return { data, isLoading, error };
}