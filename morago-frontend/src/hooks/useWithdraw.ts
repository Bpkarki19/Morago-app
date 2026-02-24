import { useState } from "react";
import { withdrawRequest } from "../api/auth";
import { isAxiosError } from "axios";


export const useWithdraw = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const withdraw = async (accountHolder: string, nameOfBank: string, won: number) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await withdrawRequest(accountHolder, nameOfBank, won);
            setSuccess(true);
            return response;
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to withdraw");
            } else {
                setError("An unexpected error occurred");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { withdraw, loading, error, success };
};