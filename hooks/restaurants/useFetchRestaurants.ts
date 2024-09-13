import { useQuery } from "react-query";
import { getRestaurants } from "@/utils/restaurants/restaurants";
import { useEffect } from "react";

export const useFetchRestaurants = (filters: any) => {
    const { data, isLoading, error, refetch } = useQuery(
        ['restaurants', filters],
        () => getRestaurants(),
        {
            enabled: !!filters,
        }
    );

    useEffect(() => {
        if (filters) {
            refetch();
        }
    }, [filters, refetch]);

    return { data, isLoading, error, refetch };
};