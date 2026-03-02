import { User, Lock, Bell, HelpCircle, ShieldCheck, Users, LogOut } from "lucide-react";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export const ProfilePage = () => {
    const navigate = useNavigate();
    const { user: authUser, setIsAuthenticated, setUser } = useAuth();
    const user = {
        name: authUser?.name || "First and Last Name",
        phone: authUser?.phone || "No phone available",
        image: null,
        role: authUser?.role
    };

    const handleEditProfile = () => {
        if (user.role === 'ROLE_TRANSLATOR') {
            navigate('/translator-profile-edit');
        } else {
            navigate('/edit-profile');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <div className={styles.ProfilePagecontainer}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>My Profile</h1>
                    <div className={styles.userProfile}>
                        <div className={styles.avatarWrapper}>
                            {user.image ? (
                                <img src={user.image} alt={user.name} className={styles.avatar} />
                            ) : (
                                <div className={styles.placeholderAvatar}>
                                    <User size={32} color="#015F76" />
                                </div>
                            )}
                        </div>
                        <div className={styles.userInfo}>
                            <h2>{user.name}</h2>
                            <p>{user.phone}</p>
                        </div>
                        {(user.role === 'ROLE_USER' || user.role === 'ROLE_TRANSLATOR') && (
                            <button className={styles.editButton} onClick={handleEditProfile}>Edit</button>
                        )}
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Settings</h3>
                    <div className={styles.cardList}>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <Lock size={20} />
                            </div>
                            <span className={styles.cardText} onClick={() => navigate('/change-password')}>Change Password</span>
                        </div>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <Bell size={20} />
                            </div>
                            <span className={styles.cardText}>Notifications</span>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>About the App</h3>
                    <div className={styles.cardList}>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <HelpCircle size={20} />
                            </div>
                            <span className={styles.cardText}>FAQ</span>
                        </div>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <ShieldCheck size={20} />
                            </div>
                            <span className={styles.cardText}>Privacy Policy</span>
                        </div>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <Users size={20} />
                            </div>
                            <span className={styles.cardText}>Contact Us</span>
                        </div>
                        <div className={styles.cardItem}>
                            <div className={styles.cardIcon}>
                                <LogOut size={20} />
                            </div>
                            <span className={styles.cardText} onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
};