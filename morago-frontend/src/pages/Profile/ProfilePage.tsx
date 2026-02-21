import { User, Lock, Bell, HelpCircle, ShieldCheck, Users, LogOut } from "lucide-react";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";


export const ProfilePage = () => {
    const navigate = useNavigate();
    const user = {
        name: "First and Last Name",
        phone: "010 1234 56 78",
        image: null
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
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
                        <button className={styles.editButton} onClick={() => navigate('/edit-profile')}>Edit</button>
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