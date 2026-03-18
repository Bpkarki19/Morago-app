import { useState, useCallback } from "react";
import { toggleTranslatorStatusRequest, getAvailableTranslatorsRequest } from "../api/auth";

interface Translator {
    id: number;
    name: string;
    language: string;
    rating: number;
    reviewsCount: number;
    image?: string;
}

export const useTranslators = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [translators, setTranslators] = useState<Translator[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const availabilityToggle = useCallback(async () => {
        setError(null);
        setIsAvailable(prev => !prev);

        try {
            await toggleTranslatorStatusRequest();
        } catch (err) {
            console.error("Failed to toggle status:", err);
            setError("Failed to toggle translator status");
            // Rollback on error
            setIsAvailable(prev => !prev);
            throw err;
        }
    }, []);

    const fetchAvailable = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAvailableTranslatorsRequest();
            // Handle both paginated { content: [...] } and plain array responses
            setTranslators(Array.isArray(data) ? data : (data.content ?? []));
        } catch (err) {
            console.error("Failed to fetch translators:", err);
            setError("Failed to load translators");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isAvailable,
        error,
        availabilityToggle,
        translators,
        isLoading,
        fetchAvailable,
    };
};