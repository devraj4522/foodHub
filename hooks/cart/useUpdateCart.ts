// import { useMutation } from "react-query";
// import { updateCart } from "@/utils/cart/cart";
// import { useRecoilState } from "recoil";
// import { cartAtom } from "@/recoil/atoms/cartAtom";
// import { useState } from "react";
// import { createCartItem } from "@/actions/cart";

// export const useUpdateCart = () => {
//   const [cart, setCart] = useRecoilState(cartAtom);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const updateMutation = useMutation(updateCart, {
//     onSuccess: (response) => {
//       // Assuming the API returns the updated cart items
//       // setCartItems(response);
//       setIsSuccess(true);
//     },
//   });

//   const createMutation = useMutation(createCartItem, {
//     onSuccess: (newItem) => {
//       setCartItems((prevItems) => [...prevItems, newItem]);
//       setIsSuccess(true);
//     },
//   });

//   const updateCartItem = (items: CartItem[]) => {
//     updateMutation.mutate(items);
//   };

//   const addCartItem = (item: ICreateCartItemInput) => {
//     createMutation.mutate(item);
//   };

//   return { 
//     updateCartItem, 
//     addCartItem,
//     isLoading: updateMutation.isLoading || createMutation.isLoading,
//     error: updateMutation.error || createMutation.error,
//     isSuccess 
//   };
// };
