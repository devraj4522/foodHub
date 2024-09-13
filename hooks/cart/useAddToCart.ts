import { useMutation } from "react-query";
import { addToCart } from "@/utils/cart/cart";
import { useRecoilState } from "recoil";
import { cartItemsAtom } from "@/recoil/atoms/cartAtom";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useAddToCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isLoading, error } = useMutation(addToCart, {
    onSuccess: (response) => {
      // Assuming the API returns the added item in the response
      const addedItem = response; // Based on the mock response in utils/cart/cart.ts
      setCartItems((prevItems) => [...prevItems, addedItem[-1]]);
      setIsSuccess(true);
    },
  });

  const addItemToCart = (item: CartItem) => {
    mutate(item);
  };

  return { addItemToCart, isLoading, error, isSuccess };
};
