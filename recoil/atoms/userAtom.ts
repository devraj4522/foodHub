import { atom } from 'recoil';

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isLoggedIn: boolean;
}

export const userAtom = atom<UserDetails>({
  key: 'userState',
  default: {
    name: "Dev Raj Singh",
    email: "dev@tst.com",
    phone: "+91 9122604411",
    address: "Salt Lake Sector V, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700101",
    isLoggedIn: false,
  },
});