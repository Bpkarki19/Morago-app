import { useState, useEffect } from "react";
import { getTranslatorProfileRequest } from "../api/auth";

export const useTranslator = () => {
    const [translator, setTranslator] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTranslator = async () => {
            try {
                setLoading(true);
                const data = await getTranslatorProfileRequest();
                setTranslator(data);
            } catch {
                setError("Failed to fetch translator profile");
            } finally {
                setLoading(false);
            }
        };
        fetchTranslator();
    }, []);

    return { translator, loading, error };
}