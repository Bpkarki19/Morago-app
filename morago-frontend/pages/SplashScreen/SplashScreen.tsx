import styles from './SplashScreen.module.css';

export const SplashScreen = () => {
    return (
        <div className={styles.splashScreenContainer}>
            <div className={styles.loadingContainer}>
                <div className={styles.dot1}></div>
                <div className={styles.dot2}></div>
                <div className={styles.dot3}></div>
            </div>
            <span className={styles.loadingText}>morago</span>
        </div>
    );
};

