import { getUser } from "@/utils/user/auth";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";
import { UserDetails } from "@/types";

export const useGetUserHook = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const { data, isLoading, error } = useQuery("user", getUser, {
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user as UserDetails);
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { user, isLoading, error };
};