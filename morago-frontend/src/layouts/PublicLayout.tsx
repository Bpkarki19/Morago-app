import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicLayout = () => {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
        const homePath = user.role === 'ROLE_TRANSLATOR' ? '/translator-home' : '/home';
        return <Navigate to={homePath} replace />;
    }

    return (
        <div className="publicLayout">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
