import { Button } from '../../components/ui/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, X, Wallet, UserCircle } from 'lucide-react';
import styles from './ResultPage.module.css';

interface LocationState {
    status: 'success' | 'error';
    title?: string;
    description?: string;
    buttonText?: string;
    redirectPath?: string;
    type?: 'topup' | 'signup';
}

export const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    const status = state?.status || 'success';
    const isSuccess = status === 'success';
    const type = state?.type || 'topup';

    const getTitle = () => {
        if (state?.title) return state.title;
        if (type === 'signup') return isSuccess ? 'Registration Successful!' : 'Registration Failed';
        return isSuccess ? 'Top-up request completed successfully' : 'Top-up request failed';
    };

    const getDescription = () => {
        if (state?.description) return state.description;
        if (type === 'signup') return isSuccess ? 'Welcome to Morago! You can now start using our services.' : 'Please double check your details and try again.';
        return isSuccess ? 'Funds will be credited to your balance within one working day.' : 'Something went wrong with your request. Please try again.';
    };

    const getButtonText = () => {
        if (state?.buttonText) return state.buttonText;
        return isSuccess ? 'Great!' : 'Try Again';
    };

    const handleButtonClick = () => {
        if (state?.redirectPath) {
            navigate(state.redirectPath);
            return;
        }
        if (isSuccess) {
            navigate('/home');
        } else {
            navigate(-1); // Go back to previous page
        }
    };

    return (
        <div className={styles.resultContainer}>
            <div className={styles.illustrationContainer}>
                <div className={styles.cardShape}>
                    <div className={styles.walletIconWrapper}>
                        {type === 'signup' ? <UserCircle size={40} /> : <Wallet size={40} />}
                    </div>
                </div>
                <div className={`${styles.statusIndicator} ${isSuccess ? styles.successIndicator : styles.errorIndicator}`}>
                    <div className={styles.statusCircle}>
                        {isSuccess ? <Check size={24} /> : <X size={24} />}
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <h1 className={styles.title}>{getTitle()}</h1>
                <p className={styles.description}>{getDescription()}</p>
            </div>

            <div className={styles.buttonWrapper}>
                <Button
                    variant="green"
                    text={getButtonText()}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );
};