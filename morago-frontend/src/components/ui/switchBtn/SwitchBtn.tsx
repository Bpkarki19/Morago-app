import { useState } from 'react';
import styles from './SwitchBtn.module.css';

interface SwitchBtnProps {
    initialStatus?: boolean;
    onChange?: (status: boolean) => void;
}

export const SwitchBtn = ({ initialStatus = true, onChange }: SwitchBtnProps) => {
    const [isAvailable, setIsAvailable] = useState(initialStatus);

    const handleToggle = () => {
        const newStatus = !isAvailable;
        setIsAvailable(newStatus);
        if (onChange) {
            onChange(newStatus);
        }
    };

    return (
        <div className={styles.container} onClick={handleToggle}>
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
        </div>
    );
};