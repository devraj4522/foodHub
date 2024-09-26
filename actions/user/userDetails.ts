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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        return { error: error as string };
    }
}
