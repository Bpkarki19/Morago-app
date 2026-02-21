import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './Head.module.css';

export const Head = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <ArrowLeft size={28} />
            </button>
            <h1 className={styles.title}>morago</h1>
        </div>
    );
};