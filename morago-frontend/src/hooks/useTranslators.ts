import { useEffect, useState } from "react";
import { getAvailableTranslatorsRequest } from "../api/auth";
import { getTranslatorByIdRequest } from "../api/auth";


interface Translator {
    id: number;
    name: string;
    language?: string;
    image?: string;
    rating?: number;
    reviewsCount?: number;
}

export const useTranslators = () => {
    const [translators, setTranslators] = useState<Translator[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTranslators = async () => {
            try {
                const id = (await getAvailableTranslatorsRequest()).content[0].id;
                const translator = await getTranslatorByIdRequest(id);
                setTranslators(translator);
            } catch (error) {
                console.error("Failed to fetch translators:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTranslators();
    }, []);

    return {
        translators,
        isLoading,
    };
};