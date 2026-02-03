import styles from './stepIndicator.module.css';

interface Props {
    totalSteps: number;
    currentSteps: number; // index of active screen
    onStepClick: (index: number) => void;
}

export const StepsIndicator = ({ totalSteps, currentSteps, onStepClick }: Props) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i);

    return (
        <div className={styles.container}>
            {steps.map((stepIndex) => (
                <button
                    key={stepIndex}
                    onClick={() => onStepClick(stepIndex)}
                    className={`${styles.dot} ${stepIndex === currentSteps ? styles.active : ''}`}
                    aria-label={`Go to step ${stepIndex + 1}`}
                />
            ))}
        </div>
    );
}