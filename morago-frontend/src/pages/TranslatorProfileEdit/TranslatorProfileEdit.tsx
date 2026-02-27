import { useState } from "react";
import { User, Camera, Phone, Calendar, Info, Check } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import styles from "./TranslatorProfileEdit.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/ui/Header/Header";
import { useEditTranslatorProfile } from "../../hooks/useEditTranslatorProfile";
import { useClient } from "../../hooks/useClient";

export const TranslatorProfileEdit = () => {
    const navigate = useNavigate();
    const { updateProfile, isLoading, error: profileError } = useEditTranslatorProfile();
    const { defaultTopics, isLoading: loadingTopics } = useClient();

    // Form states
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [koreanLevel, setKoreanLevel] = useState("");
    const [selectedThemeIds, setSelectedThemeIds] = useState<number[]>([]);
    const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);

    const languages = [
        { id: 1, name: "Russian" },
        { id: 2, name: "Kazakh" },
        { id: 3, name: "Uzbek" },
        { id: 4, name: "English" },
        { id: 5, name: "Tajik" }
    ];

    const toggleTheme = (id: number) => {
        setSelectedThemeIds(prev =>
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    };

    const toggleLanguage = (id: number) => {
        setSelectedLanguageIds(prev =>
            prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({
                firstName,
                lastName,
                imageUrl: profileImage || "",
                levelOfKorean: parseInt(koreanLevel) || 1,
                dateOfBirth,
                themeIds: selectedThemeIds,
                languageIds: selectedLanguageIds
            });
            navigate("/translator-home");
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

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

            {profileError && <p className={styles.errorText}>{profileError}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>First name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Last name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Phone number</label>
                    <div className={styles.inputWrapper}>
                        <Phone className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="010 1234 56 78"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Date of birth</label>
                    <div className={styles.inputWrapper}>
                        <Calendar className={styles.inputIcon} size={20} />
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Korean level (TOPIK)</label>
                    <div className={styles.inputWrapper}>
                        <Info className={styles.inputIcon} size={20} />
                        <input
                            type="number"
                            min="1"
                            max="6"
                            placeholder="Enter your Korean level (1-6)"
                            value={koreanLevel}
                            onChange={(e) => setKoreanLevel(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Topics for translation</h2>
                    {loadingTopics ? <p>Loading topics...</p> : (
                        <div className={styles.checkboxGrid}>
                            {defaultTopics.map((topic: { id: number; name: string; iconUrl: string }) => (
                                <label key={topic.id} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedThemeIds.includes(topic.id)}
                                        onChange={() => toggleTheme(topic.id)}
                                        className={styles.realCheckbox}
                                    />
                                    <span className={styles.customCheckbox}>
                                        <Check size={14} className={styles.checkIcon} />
                                    </span>
                                    {topic.name}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Available translation languages</h2>
                    <div className={styles.tagsContainer}>
                        {languages.map((lang) => (
                            <span
                                key={lang.id}
                                className={`${styles.tag} ${selectedLanguageIds.includes(lang.id) ? styles.activeTag : ""}`}
                                onClick={() => toggleLanguage(lang.id)}
                            >
                                {lang.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <Button
                        variant="orange"
                        type="submit"
                        text={isLoading ? "Saving..." : "Save"}
                        className={styles.saveButton}
                        disabled={isLoading}
                    />
                    <p className={styles.agreementText}>
                        By clicking the button, you consent to the processing of your personal data
                    </p>
                </div>
            </form>
        </div>
    );
};
