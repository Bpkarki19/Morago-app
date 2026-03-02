import { useNavigate } from "react-router-dom";
import { BalanceCard } from "../../components/ui/BalanceCard/balanceCard"
import { SwitchBtn } from "../../components/ui/switchBtn/SwitchBtn";
import styles from "./TranslatorHome.module.css"
import { Header } from "../../components/ui/Header/Header";
import { useTranslators } from "../../hooks/useTranslators";
import { useBalance } from "../../hooks/useBalance";

export const TranslatorHomePage = () => {
    const navigate = useNavigate();
    const { error, availabilityToggle, isAvailable } = useTranslators();
    const { balance } = useBalance();


    if (error) return <div className={styles.serverError}>{error}</div>;

    return (
        <div className={styles.container}>
            <Header title="Translator Home" />
            <header className={styles.header}>
                {/* Balance is fetched from api  */}
                <BalanceCard balance={balance} currency="won" onClick={() => navigate("/withdraw")} />
                {/* Availability */}
                <SwitchBtn
                    isAvailable={isAvailable}
                    onChange={() => availabilityToggle()}
                />

            </header>


            <div className={styles.callHistory}>
                <span>No call history</span>
            </div>
        </div>
    );
};