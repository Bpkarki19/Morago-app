import { DotAnimation } from '../../components/DotAnimation/DotAnimation';
import styles from './SplashScreen.module.css';

export const SplashScreen = () => {
    return (
        <div className={styles.splashScreenContainer}>
            <div className={styles.loadingContainer}>
                <DotAnimation dotSize={18} />
            </div>
            <span className={styles.loadingText}>morago</span>
        </div>
    );
};

