
import styles from './SwitchBtn.module.css';

interface SwitchBtnProps {
    isAvailable?: boolean;
    onChange?: (status: boolean) => void;
}

export const SwitchBtn = ({ isAvailable = true, onChange }: SwitchBtnProps) => {

    const handleToggle = () => {
        if (onChange) {
            onChange(!isAvailable);
        }
    };

    return (
        <button
            type="button"
            className={styles.container}
            onClick={handleToggle}
            aria-label={isAvailable ? "Set to not available" : "Set to available"}
        >
            <div className={`
                ${styles.slider} 
                ${isAvailable ? styles.greenSlider : styles.redSlider} 
                ${!isAvailable ? styles.right : ''}
            `} />

            <div className={`${styles.option} ${styles.available} ${isAvailable ? styles.active : ''}`}>
                Available
            </div>

            <div className={`${styles.option} ${styles.notAvailable} ${!isAvailable ? styles.active : ''}`}>
                Not available
            </div>
        </button>
    );
};