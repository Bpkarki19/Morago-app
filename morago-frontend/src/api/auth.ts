import apiClient from "./apiClient";
import { LoginSchema } from "../schemas/LoginSchema";

export const loginRequest = async (credentials: LoginSchema) => {
    // Axios returns the data directly in the 'data' property
    const response = await apiClient.post("/auth/login", credentials);
    console.log(response.data);
    return response.data;
};