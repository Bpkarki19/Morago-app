import styles from './DotAnimation.module.css';

interface DotAnimationProps {
    dotSize?: number;
}

export const DotAnimation = ({ dotSize }: DotAnimationProps) => {
    const dotStyle = dotSize ? { width: dotSize, height: dotSize } : {};

    return (
        <div className={styles.dotsContainer}>
            <div className={`${styles.dot} ${styles.dot1}`} style={dotStyle}></div>
            <div className={`${styles.dot} ${styles.dot2}`} style={dotStyle}></div>
            <div className={`${styles.dot} ${styles.dot3}`} style={dotStyle}></div>
        </div>
    );
};
