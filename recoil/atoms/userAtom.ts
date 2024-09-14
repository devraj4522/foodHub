import { atom } from 'recoil';
import { UserDetails } from '@/types';

export const userAtom = atom<UserDetails>({
  key: 'userState',
  default: {
    name: "Dev Raj Singh",
    email: "dev@tst.com",
    phone: "+91 9122604411",
    address: ["Salt Lake Sector V, Kolkata"],
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700101",
    isLoggedIn: false,
  },
});