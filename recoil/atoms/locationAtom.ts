import { atom } from "recoil";

export const locationAtom = atom({
  key: "locationAtom",
  default: {
    latitude: 0,
    longitude: 0,
  },
});

export const addressGeocodedAtom = atom({
  key: "addressGeocodedAtom",
  default: "",
});

export const userSavedAddressAtom = atom({
  key: "userSavedAddressAtom",
  default: "",
});
