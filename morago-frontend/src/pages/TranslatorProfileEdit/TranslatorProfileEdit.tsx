import { useState } from "react";
import { User, Camera, Phone, Calendar, Info, Paperclip, Check } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import styles from "./TranslatorProfileEdit.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/ui/Header/Header";

export const TranslatorProfileEdit = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Header
                title="Complete your profile"
                backgroundColor="transparent"
                textSize={20}
                textColor="black"
                arrowColor="black"
            />

            <div className={styles.profileImageSection}>
                <div className={styles.imageWrapper}>
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className={styles.profileImg} />
                    ) : (
                        <div className={styles.placeholderImg}>
                            <User size={48} color="#94a3b8" />
                        </div>
                    )}
                    <label className={styles.cameraButton}>
                        <Camera size={20} color="#fff" />
                        <input
                            type="file"
                            accept="image/*"
                            className={styles.hiddenInput}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setProfileImage(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>

            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Full name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input type="text" name="fullName" placeholder="Enter your first and last name" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Phone number</label>
                    <div className={styles.inputWrapper}>
                        <Phone className={styles.inputIcon} size={20} />
                        <input type="text" name="phoneNumber" placeholder="010 1234 56 78" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Date of birth</label>
                    <div className={styles.inputWrapper}>
                        <Calendar className={styles.inputIcon} size={20} />
                        <input type="text" name="dateOfBirth" placeholder="Enter your date of birth" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Korean level (TOPIK)</label>
                    <div className={styles.inputWrapper}>
                        <Info className={styles.inputIcon} size={20} />
                        <input type="text" name="koreanLevel" placeholder="Enter your Korean level" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={`${styles.inputWrapper} ${styles.uploadWrapper}`}>
                        <Paperclip className={styles.inputIcon} size={20} />
                        <input type="text" readOnly placeholder="Upload TOPIK photo" />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Topics for translation</h2>
                    <div className={styles.checkboxGrid}>
                        {["Pudonsan", "Market", "Bank", "Hospital", "Restaurant", "Taxi"].map((topic) => (
                            <label key={topic} className={styles.checkboxLabel}>
                                <input type="checkbox" name={topic} className={styles.realCheckbox} />
                                <span className={styles.customCheckbox}>
                                    <Check size={14} className={styles.checkIcon} />
                                </span>
                                {topic}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Topics for translation with certificate</h2>
                    <div className={styles.certificateList}>
                        {["Legal matters", "Topic with certificate"].map((topic) => (
                            <div key={topic} className={styles.certificateItem}>
                                <label className={styles.checkboxLabel}>
                                    <input type="checkbox" name={topic} className={styles.realCheckbox} />
                                    <span className={styles.customCheckbox}>
                                        <Check size={14} className={styles.checkIcon} />
                                    </span>
                                    {topic}
                                </label>
                                <Paperclip size={18} color="#94a3b8" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Available translation languages</h2>
                    <div className={styles.tagsContainer}>
                        {["Russian", "Kazakh", "Uzbek", "English", "Tajik"].map((lang) => (
                            <span key={lang} className={styles.tag}>{lang}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <Button
                        variant="orange"
                        type="submit"
                        text="Save"
                        className={styles.saveButton}
                        onClick={() => navigate("/translator-home")}
                    />
                    <p className={styles.agreementText}>
                        By clicking the button, you consent to the processing of your personal data
                    </p>
                </div>
            </form>
        </div>
    );
};
