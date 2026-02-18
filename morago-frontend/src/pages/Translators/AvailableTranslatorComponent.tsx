
import { User, Star } from 'lucide-react';
import styles from './AvailableTranslators.module.css';


interface AvailableTranslatorProps {
    name?: string;
    language?: string;
    image?: string;
    rating?: number;
    reviewsCount?: number;
}

const AvailableTranslator = ({
    name = "Ms. Diana",
    language = "Bank",
    image,
    rating = 4,
    reviewsCount = 7
}: AvailableTranslatorProps) => {
    return (
        <>

            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    {image ? (
                        <img src={image} alt={name} className={styles.translatorImage} />
                    ) : (
                        <div className={styles.fallbackIcon}>
                            <User size={44} strokeWidth={1.5} />
                        </div>
                    )}
                </div>

                <div className={styles.translatorInfo}>
                    <div className={styles.headerRow}>
                        <h3 className={styles.name}>{name}</h3>
                        <div className={styles.ratingWrapper}>
                            <div className={styles.starsRow}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(rating) ? "#FFB800" : "none"}
                                        stroke={i < Math.floor(rating) ? "#FFB800" : "#D1D5DB"}
                                        strokeWidth={2}
                                    />
                                ))}
                            </div>
                            <span className={styles.reviewsCount}>({reviewsCount})</span>
                        </div>
                    </div>
                    <p className={styles.language}>{language}</p>
                </div>
            </div>
        </>
    );
};

export default AvailableTranslator;
