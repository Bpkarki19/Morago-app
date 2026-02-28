import { useState } from "react";
import { editTranslatorProfileRequest } from "../api/auth";

export interface TranslatorProfileData {
    firstName: string;
    lastName: string;
    imageUrl: string;
    levelOfKorean: number;
    dateOfBirth: string;
    themeIds: number[];
    languageIds: number[];
}

export const useEditTranslatorProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (data: TranslatorProfileData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await editTranslatorProfileRequest(
                data.firstName,
                data.lastName,
                data.imageUrl || "",
                data.levelOfKorean,
                data.dateOfBirth,
                data.themeIds,
                data.languageIds
            );
            return response;
        } catch (err) {
            const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to update translator profile";
            console.error("API Error:", errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading, error };
};