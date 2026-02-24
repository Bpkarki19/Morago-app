import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './balanceCard.module.css';

interface BalanceCardProps {
    balance?: string | number;
    currency?: string;
    onClick?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
    balance = "300,000",
    currency = "won",
    onClick
}) => {
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