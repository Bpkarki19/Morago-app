import { useState } from "react";
import { AuthContext, type User } from "./AuthContextTypes";

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name') || "";
        const phone = localStorage.getItem('phone') || "";
        return role ? { id: 0, name, role, phone } : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('token');
    });
    const isLoading = false;


    const value = {
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
