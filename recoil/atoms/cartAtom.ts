import { atom } from 'recoil';
import { ICartState } from '@/types/Cart';
import { PaymentMethod } from '@/types/Order';
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

export const paymentMethodAtom = atom<PaymentMethod>({
  key: 'paymentMethodState',
  default: PaymentMethod.UPI,
});


export const selectedAddressAtom = atom<string>({
  key: 'selectedAddressState',
  default: '',
});



