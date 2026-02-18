import { useEffect, useState } from "react";
import { getBalanceRequest } from "../api/auth";

export const useBalance = () => {
    const [balance, setBalance] = useState(0);


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balanceData = await getBalanceRequest();
                setBalance(balanceData);
            } catch (err) {
                console.error("API Error - Fetching balance failed:", err);
            }
        };
        fetchBalance();
    }, []);

    return {
        balance,

    }
}