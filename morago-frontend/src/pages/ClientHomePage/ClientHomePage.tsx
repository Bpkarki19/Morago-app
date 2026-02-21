import { Button } from '../../components/ui/Button/Button';
import { useClient } from '../../hooks/useClient';
import { TopicIcon } from '../../components/TopicIcon';
import { Bell, Wallet, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientHomePage.module.css';
import { useBalance } from '../../hooks/useBalance';

import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

interface Topic {
    id: number;
    iconUrl: string;
    name: string;
}

interface Calls {
    id: number;
    iconUrl: string;
    name: string;
    rating: number;

}

export const ClientHomePage = () => {
    const { defaultTopics, recentCalls, isLoading } = useClient();
    const navigate = useNavigate();
    const { balance } = useBalance();
    console.log('defaultTopics', defaultTopics);
    console.log('recentCalls', recentCalls);
    console.log('balance', balance);

    // Debugging: handle empty state gracefully to avoid crash
    if (defaultTopics.length > 0) {
        //console.log("First Topic Icon:", defaultTopics[0].iconUrl);
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.container}>

            <header className={styles.header}>

                <div className={styles.headerTop}>
                    <h1>morago</h1>
                    <button className={styles.bellButton}>
                        <Bell size={24} color="white" />
                    </button>
                </div>


                {/* balance */}
                <div className={styles.balanceSection}>
                    <div className={styles.balance}>
                        <div className={styles.balanceAmount}>
                            <span className={styles.balanceLabel}>My Balance</span>
                            <div className={styles.balanceAmountInfo}>
                                <button className={styles.iconButton}>
                                    <Wallet size={16} />
                                </button>
                                <span>{balance}</span>
                                <span>~10 min</span>
                            </div>
                        </div>
                        <div className={styles.balanceIcon}>
                            <span>Top up</span>
                            <button className={styles.iconButton} onClick={() => navigate('/topup')}>
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.callButton}>
                    <Button variant="yellow" text="Select a translator and call" onClick={() => { navigate('/available-translators') }} />
                </div>
            </header>

            <main className={styles.main}>
                <span className={styles.sectionTitle}>My recent selected topics</span>

                <div className={styles.topicsContainer}>
                    {defaultTopics.slice(0, 6).map((topic: Topic) => {
                        return (
                            <div className={styles.topics} key={topic.id}>
                                <TopicIcon iconUrl={topic.iconUrl} altText={topic.name} className={styles.topicIcon} />
                            </div>
                        )
                    })}
                </div>

                {/* recent calls */}
                <div>
                    <span className={styles.sectionTitle}>My recent calls</span>
                </div>

                <div className={styles.recentCallsContainer}>
                    {recentCalls.length !== 0 && recentCalls.map((calls: Calls) => {
                        return (
                            <div key={calls.id} className={styles.callInfo}>
                                <TopicIcon iconUrl={calls.iconUrl} altText={calls.name} className={styles.topicIcon} />
                                <span></span>
                                <div className={styles.ratings}></div>
                                <span className={styles.ratingNumber}></span>
                            </div>
                        )
                    })}

                    {recentCalls.length === 0 && <div className={styles.sorryMessage}>
                        <span>No recent calls 😔</span>
                    </div>}
                </div>

            </main>




        </div >
    );
};
