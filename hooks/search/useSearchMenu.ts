import { useQuery } from "react-query";
import { searchMenuItems } from "@/actions/food";

export const useSearchMenu = (query: string) => {
  return useQuery({
    queryKey: ["searchMenu", query],
    queryFn: () => searchMenuItems(query),
    enabled: !!query,
  });
};