import { useRecoilValue } from 'recoil';
import { cartItemsAtom } from '@/recoil/atoms/cartAtom';
    
export const useGetCartItems = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  return cartItems;
};