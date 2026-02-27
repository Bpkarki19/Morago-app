import { Button } from "../../components/ui/Button/Button";
import styles from "./EditProfile.module.css";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfileRequest } from "../../api/auth";
import { Modal } from "../../components/ui/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

export const EditProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { modalState, showError, closeModal } = useModal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateProfileRequest(firstName, lastName);
            const fullName = `${firstName} ${lastName}`;
            localStorage.setItem('name', fullName);

            if (user) {
                setUser({ ...user, name: fullName });
            }

            navigate(-1); // Go back after success
        } catch (error) {
            console.error("Error updating profile:", error);
            showError("Failed to update profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
            />
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className={styles.title}>Edit Profile</h1>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter Your Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter Your First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        type="submit"
                        variant="green"
                        text={isSubmitting ? "Saving..." : "Save Changes"}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
};