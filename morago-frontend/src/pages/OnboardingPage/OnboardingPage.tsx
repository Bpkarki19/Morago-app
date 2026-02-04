import styles from './OnboardingPage.module.css';
import { OnboardingContent } from '../../components/ui/Onboarding/OnboardingContent/OnboardingContent';
import { slides } from '../../components/ui/Onboarding/slides/slides';
import { useState } from 'react';

export const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={styles.pageWrapper}>
            <OnboardingContent
                image={slides[currentStep].image}
                title={slides[currentStep].title}
                description={slides[currentStep].description}
                currentStep={currentStep}
                totalSteps={slides.length}
                decorations={slides[currentStep].decorations}
                onStepChange={setCurrentStep}
                onSkip={() => console.log("Skip clicked")}
            />


        </div>

    )
}