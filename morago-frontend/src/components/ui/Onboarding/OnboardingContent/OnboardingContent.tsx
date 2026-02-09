import styles from "./OnboardingContent.module.css"
import { Button } from "../../Button/Button"
import { StepsIndicator } from "../StepIndicator/StepIndicator"
import { useNavigate } from "react-router-dom"


interface Props {
  image: string
  title: string
  description: string
  currentStep: number
  totalSteps: number
  decorations?: {
    left: {
      color: string;
      top: string;
    };
    right: {
      color: string;
      top: string;
    };
  }
  onStepChange: (index: number) => void
  onSkip?: () => void
}

export const OnboardingContent = ({
  title,
  description,
  image,
  currentStep,
  totalSteps,
  decorations,
  onStepChange,
  onSkip }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={image} alt={title} className={styles.image} />

      {/* Skip Button */}
      <button className={styles.skipButton} onClick={onSkip}>Skip</button>

      {/* Decorations */}
      {decorations && (
        <>
          <div
            className={`${styles.decoration} ${styles.decorationLeft}`}
            style={{ backgroundColor: decorations.left.color, top: decorations.left.top }}
          />
          <div
            className={`${styles.decoration} ${styles.decorationRight}`}
            style={{ backgroundColor: decorations.right.color, top: decorations.right.top }}
          />
        </>
      )}

      <div className={styles.textOverlay}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <StepsIndicator totalSteps={totalSteps} currentSteps={currentStep} onStepClick={onStepChange} />
        <div className={styles.buttonGroup}>
          <Button variant="green" text="Log in " onClick={() => { navigate('/login') }} />
          <Button variant="white" text="sign up " onClick={() => { navigate('/login') }} />
        </div>
      </div>
    </div>
  )
}
