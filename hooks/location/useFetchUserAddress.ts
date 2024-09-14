import { useQuery } from "react-query";
import { fetchUserAddress } from "@/utils/location/fetchUserAddrees";
import { Address } from "@/types";

export function useFetchUserAddress(userId: string) {
  const { data, isLoading, error } = useQuery('userAddress', (): Promise<Address> => fetchUserAddress(userId));

  return { data, isLoading, error };
}