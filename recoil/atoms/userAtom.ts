import { atom } from 'recoil';
import { UserDetails } from '@/types';

export const userAtom = atom<UserDetails | null>({
  key: 'userState',
  default: null,
});

export const showLoginFormAtom = atom<boolean>({
  key: 'showLoginFormState',
  default: false,
});

