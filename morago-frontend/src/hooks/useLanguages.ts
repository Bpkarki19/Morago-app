import { useState, useEffect } from "react";
import { getLanguageRequest } from "../api/auth";

export interface Language {
    id: number;
    name: string;
}

export const useLanguages = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const data = await getLanguageRequest();
                // API returns an array of languages
                setLanguages(data);
            } catch (err) {
                console.error("Error fetching languages:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, []);

    return { languages, isLoading, error };
};
