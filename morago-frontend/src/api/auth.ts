import apiClient from "./apiClient";
import { LoginSchema, SignupSchema } from "../schemas/Schema";
import { z } from "zod";

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;

export interface AuthResponse {
    token: string;
    message?: string;

}

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