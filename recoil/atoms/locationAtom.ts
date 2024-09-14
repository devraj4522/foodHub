import { atom } from "recoil";

export const locationAtom = atom({
  key: "locationAtom",
  default: {
    latitude: 0,
    longitude: 0,
  },
});

export const addressAtom = atom({
  key: "addressAtom",
  default: "",
});

