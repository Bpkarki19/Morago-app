import apiClient from "./apiClient";
import { ChangePasswordSchema, LoginSchema, SignupSchema } from "../schemas/Schema";
import { z } from "zod";

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export interface AuthResponse {
    token: string;
    message?: string;
    roles?: string | string[];
}

//---------------------------------------CLIENT------------------------------------------------------------------
export const loginRequest = async (credentials: LoginSchema) => {
    // Axios returns the data directly in the 'data' property
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
};

//(credentials: Omit<SignupSchema, "confirmPassword">)
export const signupRequest = async (credentials: SignupSchema) => {
    // Axios returns the data directly in the 'data' property
    const response = await apiClient.post("/auth/register", credentials);
    return response.data;
};

export const getTopicsRequest = async () => {
    const response = await apiClient.get("/profile/themes");
    return response.data;
};

export const getRecentCallsRequest = async () => {
    try {
        const response = await apiClient.get("/profile/themes/recent-calls",
            {
                params: {
                    page: 0,
                    size: 5,
                    sortBy: 'id',
                    sortDirection: 'ASC'
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error fetching recent calls:", error);
        throw error;
    }

};


export const changePasswordRequest = async (credentials: ChangePasswordSchema) => {
    const response = await apiClient.post("/profile/password/update", credentials);
    return response.data;
};


export const getAvailableTranslatorsRequest = async () => {
    const response = await apiClient.get("/user/translators",
        {
            params: {
                page: 0,
                size: 6,
                sortBy: 'id',
                sortDirection: 'ASC'
            }
        }
    );
    return response.data;
};


export const getTranslatorByIdRequest = async (id: number) => {
    const response = await apiClient.get(`/user/translators/${id}`);
    return response.data;
};


export const postDepositRequest = async (accountHolder: string, nameOfBank: string, won: number) => {
    const response = await apiClient.post("/user/deposit", {
        accountHolder,
        nameOfBank,
        won
    });
    return response.data;
};


export const getBalanceRequest = async () => {
    const response = await apiClient.get("/profile/balance");
    return response.data;
};


export const updateProfileRequest = async (firstName: string, lastName: string) => {
    const response = await apiClient.put("/user", { firstName, lastName });
    return response.data;
};

export const getNotificationRequest = async () => {
    const response = await apiClient.get("/profile/notifications", {
        params: {
            page: 0,
            size: 5,
            sortBy: 'id',
            sortDirection: 'ASC'
        }
    });
    return response.data;
};

//----------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------TRANSLATOR-------------------------------------------------------

export const toggleTranslatorStatusRequest = async () => {
    const response = await apiClient.put("/translator/switch-status");
    return response.data;
};




export const withdrawRequest = async (accountHolder: string, nameOfBank: string, won: number) => {
    const response = await apiClient.post("/translator/withdrawal", {
        accountHolder,
        nameOfBank,
        won
    });
    return response.data;
};


export const editTranslatorProfileRequest = async (
    firstName: string,
    lastName: string,
    imageUrl: string,
    levelOfKorean: number,
    dateOfBirth: string,
    themeIds: number[],
    languageIds: number[]
) => {
    const response = await apiClient.patch("/translator", {
        firstName,
        lastName,
        imageUrl,
        levelOfKorean,
        dateOfBirth,
        themeIds,
        languageIds
    });
    return response.data;
};


export const getLanguageRequest = async () => {
    const response = await apiClient.get("/api/languages");
    return response.data;
}