import { UserDetails } from "@/types";
import { ICreateUserInput } from "@/types/User";

export const updateUserDetails = async (userData: Omit<ICreateUserInput, 'otpCode'> & { id: string }) => {
    try {
        const response = await fetch("/api/user", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { error: errorMessage };
    }
}
