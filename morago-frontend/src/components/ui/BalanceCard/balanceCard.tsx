
import { ChevronRight } from 'lucide-react';
import styles from './balanceCard.module.css';

interface BalanceCardProps {
    balance?: string | number | null;
    currency?: string;
    onClick?: () => void;
}

export const BalanceCard = ({
    balance,
    currency,
    onClick
}: BalanceCardProps) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.leftSection}>
                <span className={styles.label}>My balance</span>
                <div className={styles.amountContainer}>
                    <div className={styles.coinIcon}>C</div>
                    <span className={styles.amount}>{balance}</span>
                    <span className={styles.currency}>{currency}</span>
                </div>
            </div>
            <ChevronRight className={styles.chevronIcon} size={24} />
        </div>
    );
};