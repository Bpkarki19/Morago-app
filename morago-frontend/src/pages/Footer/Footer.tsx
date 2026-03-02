import styles from "./Footer.module.css";
import { Home, Phone, MessageSquareMore, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const isTranslator = user?.role === 'ROLE_TRANSLATOR';
    const homePath = isTranslator ? '/translator-home' : '/home';

    const isActive = (path: string) => location.pathname === path;

    return (
        <footer className={styles.footer}>
            <button
                className={`${styles.navItem} ${isActive(homePath) ? styles.active : ""}`}
                onClick={() => navigate(homePath)}
            >
                <div className={styles.iconWrapper}>
                    <Home size={24} fill={isActive(homePath) ? "#fb923c" : "none"} color={isActive(homePath) ? "#fb923c" : "#9499ad"} />
                </div>
                <span>Home</span>
            </button>
            <button className={styles.navItem}>
                <div className={styles.iconWrapper}>
                    <Phone size={24} color="#9499ad" />
                </div>
                <span>My calls</span>
            </button>
            <button className={styles.navItem}>
                <div className={styles.iconWrapper}>
                    <MessageSquareMore size={24} color="#9499ad" />
                </div>
                <span>Messages</span>
            </button>
            <button
                className={`${styles.navItem} ${isActive('/profile') ? styles.active : ""}`}
                onClick={() => navigate('/profile')}
            >
                <div className={styles.iconWrapper}>
                    <User size={24} color={isActive('/profile') ? "#fb923c" : "#9499ad"} />
                </div>
                <span>Profile</span>
            </button>
        </footer>
    );
};