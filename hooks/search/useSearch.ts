import { useQuery } from "react-query";
import { searchRestaurantsORMenuItems } from "@/actions/search";

export const useSearch = (query: string) => {
  
  return useQuery({
    queryKey: ["searchRestaurantWithMenu", query],
    queryFn: () => searchRestaurantsORMenuItems(query),
    enabled: !!query,
  });
};


