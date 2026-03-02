import { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { Button } from "../../components/ui/Button/Button";
import styles from "./ChangePassword.module.css";
import { Modal } from "../../components/ui/Modal/Modal";

export const ChangePassword = () => {
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, onSubmit, errors, isSubmitting, serverError, modalState, handleModalClose } = useUpdatePassword();

    return (
        <div className={styles.container}>
            <Modal
                isOpen={modalState.isOpen}
                onClose={handleModalClose}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
            />
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className={styles.title}>Change Password</h1>
            </header>

            {serverError && <div className={styles.errorText} style={{ textAlign: 'center', marginBottom: '10px' }}>{serverError}</div>}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {/* Current Password */}
                <div className={styles.inputGroup}>
                    <div className={styles.labelRow}>
                        <label className={styles.label}>Current Password</label>
                        <span className={styles.forgotPassword}>Forgot Password</span>
                    </div>
                    <div className={`${styles.inputWrapper} ${errors.oldPassword ? styles.inputWrapperError : ""}`}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                            {...register("oldPassword")}
                            className={styles.input}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.oldPassword && <span className={styles.errorText}>{errors.oldPassword.message}</span>}
                </div>

                {/* New Password */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>New Password</label>
                    <div className={`${styles.inputWrapper} ${errors.newPassword ? styles.inputWrapperError : ""}`}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                            {...register("newPassword")}
                            className={styles.input}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.newPassword && <span className={styles.errorText}>{errors.newPassword.message}</span>}
                </div>

                {/* Repeat New Password */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Repeat New Password</label>
                    <div className={`${styles.inputWrapper} ${errors.confirmPassword ? styles.inputWrapperError : ""}`}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                            {...register("confirmPassword")}
                            className={styles.input}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repeat New Password"
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        type="submit"
                        variant="green"
                        text={isSubmitting ? "Saving..." : "Save Changes"}
                    />
                </div>
            </form>
        </div>
    );
};