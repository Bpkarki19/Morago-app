import styles from "./Footer.module.css";
import { Home, Phone, MessageSquareMore, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className={styles.footer}>
            <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigate('/home')}>
                <div className={styles.iconWrapper}>
                    <Home size={24} fill="white" />
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
            <button className={styles.navItem} onClick={() => navigate('/profile')}>
                <div className={styles.iconWrapper}>
                    <User size={24} color="#9499ad" />
                </div>
                <span>Profile</span>
            </button>
        </footer>
    );
};