import axios from "axios";
import { UserDetails } from "@/types";
import { ICreateUserInput } from "@/types/User";

export const updateUserDetails =  async (userData: ICreateUserInput & { id: string }) => {
    try {
        return await axios.put("/api/user", userData);
    } catch (error) {
        return { error: error as string };
    }
}

