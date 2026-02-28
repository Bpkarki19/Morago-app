import { useState, useCallback } from "react";
import { toggleTranslatorStatusRequest } from "../api/auth";



export const useTranslators = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availabilityToggle = useCallback(async () => {
        setError(null);
        //  update status
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

    return {
        isAvailable,
        error,
        availabilityToggle
    };
};