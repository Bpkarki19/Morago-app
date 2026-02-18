import { useForm } from "react-hook-form";
import { User, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./topUp.module.css";
import { useState } from "react";
import { postDepositRequest } from "../../api/auth";


interface TopUpFormData {
    senderName: string;
    amount: number;
}

const AMOUNTS = [
    { value: 10000, label: "10,000 won" },
    { value: 30000, label: "30,000 won" },
    { value: 50000, label: "50,000 won" },
    { value: 100000, label: "100,000 won" },
];

export const TopUp = () => {
    const [selectedAmount, setSelectedAmount] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TopUpFormData>({
        defaultValues: {
            senderName: "",
            amount: 0
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data: TopUpFormData) => {
        if (selectedAmount === 0) {
            alert("Please select an amount to top up.");
            return;
        }

        try {
            await postDepositRequest(data.senderName, "KEB Hana Bank", selectedAmount);
            navigate('/result', { state: { status: 'success', type: 'topup' } });
        } catch (error) {
            console.error("Top Up Error:", error);
            // Navigate to result with error state if the API fails
            navigate('/result', { state: { status: 'error', type: 'topup' } });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText("1234 5678 9101 1234");
        alert("Account number copied!");
    };

    return (
        <div className={styles.topUpContainer}>
            <div className={styles.bankCard}>
                <div className={styles.cardNumberRow}>
                    <span className={styles.cardNumber}>1234 5678 9101 1234</span>
                    <button type="button" onClick={copyToClipboard} className={styles.copyButton}>Copy</button>
                </div>
                <div className={styles.bankName}>
                    <span>KEB Hana Bank</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
                <div className={styles.inputSection}>
                    <label className={styles.label}>Sender's name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Last Name First Name"
                            {...register("senderName", { required: "Name is required" })}
                        />
                    </div>
                    {errors.senderName && <p className={styles.errorText}>{errors.senderName.message}</p>}
                </div>

                <div className={styles.inputSection}>
                    <label className={styles.label}>Amount to top up</label>
                    <div className={styles.amountGrid}>
                        {AMOUNTS.map((amt) => (
                            <div
                                key={amt.value}
                                className={`${styles.amountOption} ${selectedAmount === amt.value ? styles.active : ""}`}
                                onClick={() => setSelectedAmount(amt.value)}
                            >
                                <div className={styles.amountLeft}>
                                    <div className={styles.coinIcon}>C</div>
                                    <span className={styles.amountText}>{amt.label}</span>
                                </div>
                                {selectedAmount === amt.value && <Check size={20} className={styles.checkIcon} />}
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? "Requesting..." : "Request top-up"}
                </button>

                <p className={styles.supportLink}>Support</p>
            </form>
        </div>
    );
};
