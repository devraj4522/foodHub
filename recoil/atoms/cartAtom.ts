import { atom } from 'recoil';
import { ICartState } from '@/types/Cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const showCartAtom = atom<boolean>({
  key: 'showCartState',
  default: false,
});



export const cartAtom = atom<ICartState | null>({
  key: 'cartState',
  default: null,
});

