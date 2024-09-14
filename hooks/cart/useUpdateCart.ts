import { useMutation } from "react-query";
import { updateCart } from "@/utils/cart/cart";
import { useRecoilState } from "recoil";
import { cartItemsAtom } from "@/recoil/atoms/cartAtom";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useUpdateCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isLoading, error } = useMutation(updateCart, {
    onSuccess: (response) => {
      // Assuming the API returns the updated cart items
      // setCartItems(response);
      setIsSuccess(true);
    },
  });

    const updateCartItem = (items: CartItem[]) => {
    mutate(items);
  };

  return { updateCartItem, isLoading, error, isSuccess };
};
