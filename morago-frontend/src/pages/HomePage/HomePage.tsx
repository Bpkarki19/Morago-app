import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Home Page</h1>
                <p>Welcome to Morago!</p>
            </header>

            <main className={styles.main}>
                <div className={styles.card}>
                    <h2>Successfully Logged In</h2>
                    <p>You have successfully authenticated and reached the home page.</p>
                </div>
            </main>

            <button className={styles.logoutButton} onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
};
