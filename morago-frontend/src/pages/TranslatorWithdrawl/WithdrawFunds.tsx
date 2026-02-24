import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Home, Wallet, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import styles from "./WithdrawFunds.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { withdrawSchema } from "../../schemas/Schema";
import type { WithdrawSchema } from "../../schemas/Schema";
import { useWithdraw } from "../../hooks/useWithdraw";
import { useEffect } from "react";
import { Modal } from "../../components/ui/Modal/Modal";
import { useModal } from "../../hooks/useModal";

export const WithdrawFundsPage = () => {
    const navigate = useNavigate();
    const { withdraw, loading, error, success } = useWithdraw();
    const { modalState, showSuccess, closeModal } = useModal();

    const handleCloseModal = () => {
        closeModal();
        if (success) {
            navigate("/translator-home");
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WithdrawSchema>({
        resolver: zodResolver(withdrawSchema),
        defaultValues: {
            accountHolder: "",
            nameOfBank: "",
            won: 50000,
        },
    });

    const onSubmit = async (data: WithdrawSchema) => {
        try {
            await withdraw(data.accountHolder, data.nameOfBank, data.won);
        } catch (err) {
            console.error("Withdrawal failed:", err);
        }
    };

    useEffect(() => {
        if (success) {
            showSuccess("Withdrawal request submitted successfully!");
        }
    }, [success, showSuccess]);

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <ArrowLeft size={40} color="#1e293b" strokeWidth={3} />
            </button>

            <div className={styles.titleSection}>
                <h1 className={styles.title}>Withdrawal of funds</h1>
                <p className={styles.description}>
                    The minimum withdrawal amount is 50,000 won.
                    Enter your account number and the funds will be
                    credited to you within one working day.
                </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Bank account number</label>
                    <div className={styles.inputWrapper}>
                        <ShieldCheck className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Bank account number"
                            {...register("accountHolder")}
                        />
                    </div>
                    {errors.accountHolder && (
                        <span className={styles.errorMessage}>{errors.accountHolder.message}</span>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Bank name</label>
                    <div className={styles.inputWrapper}>
                        <Home className={styles.inputIcon} size={20} />
                        <select
                            className={`${styles.input} ${styles.selectInput}`}
                            {...register("nameOfBank")}
                        >
                            <option value="">Your bank name</option>
                            <option value="kb">KB Kookmin Bank</option>
                            <option value="shinhan">Shinhan Bank</option>
                            <option value="woori">Woori Bank</option>
                            <option value="hana">Hana Bank</option>
                            <option value="kakao">KakaoBank</option>
                        </select>
                        <ChevronDown className={styles.chevronIcon} size={20} />
                    </div>
                    {errors.nameOfBank && (
                        <span className={styles.errorMessage}>{errors.nameOfBank.message}</span>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Amount to withdraw</label>
                        <span className={styles.balanceLabel}>(Balance 300,000 won)</span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Wallet className={styles.inputIcon} size={20} />
                        <input
                            type="number"
                            className={styles.input}
                            placeholder="Amount to withdraw"
                            {...register("won", { valueAsNumber: true })}
                        />
                    </div>
                    {errors.won && (
                        <span className={styles.errorMessage}>{errors.won.message}</span>
                    )}
                </div>

                {error && <div className={styles.serverError}>{error}</div>}

                <Button
                    type="submit"
                    variant="orange"
                    className={styles.withdrawButton}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Withdraw"}
                </Button>
            </form>

            <a className={styles.supportLink}>Support</a>

            <Modal
                {...modalState}
                onClose={handleCloseModal}
            />
        </div>
    );
};

