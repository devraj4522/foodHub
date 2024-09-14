import axios from "axios";
import { Address } from "@/types";


const API = "https://express-server-production-898f.up.railway.app/api/v1";

export const fetchUserAddress = async (userId: string): Promise<Address> => {
  // const res = await axios.get(`${API}/location/user-address?userId=${userId}`);
  // dummy data
  const res = {
    data: {
      display_name: "123 Main St, Anytown, USA"
    }
  }
  const data = res.data;
  return data;
};