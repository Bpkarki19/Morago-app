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
            console.log("Profile updated successfully:", response);
            return response;
        } catch (err: unknown) {
            const errorMessage = err.response?.data?.message || "Failed to update translator profile";
            console.error("API Error:", errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading, error };
};