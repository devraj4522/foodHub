import { atom } from 'recoil';

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

export const cartItemsAtom = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [
    {
      id: '1',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
  ],
});

