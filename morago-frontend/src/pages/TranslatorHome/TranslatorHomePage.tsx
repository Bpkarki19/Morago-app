import { useNavigate } from "react-router-dom";
import { BalanceCard } from "../../components/ui/BalanceCard/balanceCard"
import { SwitchBtn } from "../../components/ui/switchBtn/SwitchBtn";
import styles from "./TranslatorHome.module.css"
import { Header } from "../../components/ui/Header/Header";
import { useTranslator } from "../../hooks/useTranslator";

export const TranslatorHomePage = () => {
    const navigate = useNavigate();
    const { translator, loading, error, balance } = useTranslator();
    console.log("translator-switch", translator);
    console.log("translator-balance", balance);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className={styles.serverError}>{error}</div>;

    return (
        <div className={styles.container}>
            <Header title="Translator Home" />
            <header className={styles.header}>
                <BalanceCard balance={balance} currency="won" onClick={() => navigate("/withdraw")} />
                <SwitchBtn initialStatus={true} onChange={(status) => console.log(status)} />

            </header>


            <div className={styles.callHistory}>
                <span>No call history</span>
            </div>
        </div>
    );
};