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
    {
      id: '2',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '4',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '5',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '6',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '7',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '8',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '9',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    {
      id: '10',
      name: 'Itallian Bistro',
      price: 10,
      quantity: 1,
    },
    
  ],
});

