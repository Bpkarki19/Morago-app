import styles from './onboardingPage.module.css';
import { OnboardingContent } from '../../components/ui/onboarding/onboardingContent/OnboardingContent';
import { slides } from '../../components/ui/onboarding/slides/slides';
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
                decorations={slides[currentStep].decorations}
                onStepChange={setCurrentStep}
                onSkip={() => console.log("Skip clicked")}
            />


        </div>

    )
}