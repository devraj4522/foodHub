import { getUser } from "@/utils/user/auth";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";
import { UserDetails } from "@/types";

// export const useGetUserHook = () => {
//   const [user, setUser] = useRecoilState(userAtom);
//   const { data, isLoading, error } = useQuery("user", getUser, {
//     onSuccess: (data) => {
//       if (data && data.user) {
//         const userDetails: UserDetails = {
//           ...data.user,
//           address: [data.user?.address || ''],
//           phone: data.user?.phone || '',
//           city: data.user?.city || '',
//           state: data.user?.state || '',
//           pinCode: data.user?.pinCode || '',
//           isLoggedIn: data.user?.isLoggedIn || false
//         };
//         setUser(userDetails);
//       }
//     },
//     staleTime: Infinity,
//     cacheTime: Infinity,
//   });

//   return { user, isLoading, error };
// };