import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../pages/Footer/Footer";

export const PrivateLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    const hideFooterRoutes = ['/', '/login', '/signup', '/edit-profile', '/change-password', '/translator-profile-edit'];
    const shouldShowFooter = isAuthenticated && !hideFooterRoutes.includes(location.pathname);
    return (
        <div className="privateLayout">
            <main>
                <Outlet />
            </main>
            {shouldShowFooter && <Footer />}
        </div>
    );
};

export default PrivateLayout;