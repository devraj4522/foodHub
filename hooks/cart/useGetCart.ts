import { useRecoilValue } from 'recoil';
import { cartAtom } from '@/recoil/atoms/cartAtom';
import { getCartByUserId } from '@/actions/cart';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atoms/userAtom';

export const useGetCart = () => {
  const user = useRecoilValue(userAtom);
  const [cart, setCart] = useRecoilState(cartAtom);

  useEffect(() => {
    const fetchCart = async (id:string) => {
      const cart = await getCartByUserId(id);
      setCart(cart);
    };
    if (user && 'id' in user && typeof user.id === 'string') {
      fetchCart(user.id);
    }
  }, [user]);
  return cart;
};