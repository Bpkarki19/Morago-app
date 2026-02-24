import AvailableTranslator from './AvailableTranslatorComponent';
import styles from './AvailableTranslators.module.css';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Head } from '../Head/Head';
import { useTranslators } from '../../hooks/useTranslators';


export const AvailableTranslators = () => {
    const { translators, isLoading } = useTranslators();
    console.log('translators', translators)


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Head />
            <div className={styles.pageContainer}>
                <main className={styles.translatorsList}>
                    {translators.length > 0 ? (
                        translators.map(translator => (
                            <AvailableTranslator
                                key={translator.id}
                                name={translator.name}
                                language={translator.language}
                                rating={translator.rating}
                                reviewsCount={translator.reviewsCount}
                                image={translator.image}
                            />
                        ))
                    ) : (
                        <p>No translators available at the moment.</p>
                    )}
                </main>
            </div>
        </>
    );
};