import { Address } from "@/types";
import axios from "axios";

export const fetchLocation = async (latitude: number, longitude: number): Promise<Address> => {
  const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
  const data: Address = res.data;
  return data;
};