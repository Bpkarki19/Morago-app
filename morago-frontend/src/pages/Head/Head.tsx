import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './Head.module.css';

interface HeadProps {
    backgroundColor?: string;
    textSize?: string | number;
    title?: string;
}

export const Head = ({ backgroundColor, textSize, title = "morago" }: HeadProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container} style={{ backgroundColor }}>
            <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowLeft size={28} />
            </button>
            <h1 className={styles.title} style={{ fontSize: textSize }}>
                {title}
            </h1>
        </div>
    );
};