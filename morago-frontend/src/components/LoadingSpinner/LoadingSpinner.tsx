import { DotAnimation } from '../DotAnimation/DotAnimation';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
    return (
        <div className={styles.loadingOverlay}>
            <DotAnimation />
        </div>
    );
};
