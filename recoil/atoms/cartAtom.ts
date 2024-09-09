import { atom } from 'recoil';

export const showCartAtom = atom<boolean>({
  key: 'showCartState',
  default: false,
});
