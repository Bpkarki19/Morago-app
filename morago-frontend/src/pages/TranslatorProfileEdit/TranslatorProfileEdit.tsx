
import { User, Camera, Phone, Calendar, Info, Check } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import styles from "./TranslatorProfileEdit.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/ui/Header/Header";
import { useEditTranslatorProfile } from "../../hooks/useEditTranslatorProfile";
import { useClient } from "../../hooks/useClient";
import { useLanguages } from "../../hooks/useLanguages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { translatorProfileSchema, type TranslatorProfileSchema } from "../../schemas/Schema";

export const TranslatorProfileEdit = () => {
    const navigate = useNavigate();
    const { updateProfile, isLoading, error: profileError } = useEditTranslatorProfile();
    const { defaultTopics, isLoading: loadingTopics } = useClient();

    const { languages, isLoading: loadingLanguages, error: languageError } = useLanguages();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<TranslatorProfileSchema>({
        resolver: zodResolver(translatorProfileSchema) as unknown as any,//due to zod and react-hook-form compatibility issue
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            phoneNumber: "",
            levelOfKorean: 1,
            themeIds: [],
            languageIds: [],
            imageUrl: "",

        }
    });

    const profileImage = watch("imageUrl");
    const selectedThemeIds = watch("themeIds") || [];
    const selectedLanguageIds = watch("languageIds") || [];

    const toggleTheme = (id: number) => {
        if (selectedThemeIds.includes(id)) {
            setValue("themeIds", selectedThemeIds.filter(t => t !== id));
        } else {
            setValue("themeIds", [...selectedThemeIds, id]);
        }
    };

    const toggleLanguage = (id: number) => {
        if (selectedLanguageIds.includes(id)) {
            setValue("languageIds", selectedLanguageIds.filter(l => l !== id));
        } else {
            setValue("languageIds", [...selectedLanguageIds, id]);
        }
    };

    const onSubmit = async (data: TranslatorProfileSchema) => {
        try {
            const {
                firstName,
                lastName,
                imageUrl,
                levelOfKorean,
                dateOfBirth,
                themeIds,
                languageIds
            } = data;
            await updateProfile({
                firstName,
                lastName,
                imageUrl: imageUrl || "",
                levelOfKorean,
                dateOfBirth,
                themeIds,
                languageIds
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
                                        const dataUrl = reader.result as string;
                                        setValue("imageUrl", dataUrl);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>

            {profileError && <p className={styles.errorText}>{profileError}</p>}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label>First name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            {...register("firstName")}
                        />
                    </div>
                    {errors.firstName && <p className={styles.errorText}>{errors.firstName.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label>Last name</label>
                    <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            {...register("lastName")}
                        />
                    </div>
                    {errors.lastName && <p className={styles.errorText}>{errors.lastName.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label>Phone number</label>
                    <div className={styles.inputWrapper}>
                        <Phone className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="010 1234 56 78"
                            {...register("phoneNumber")}
                        />
                    </div>
                    {errors.phoneNumber && <p className={styles.errorText}>{errors.phoneNumber.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label>Date of birth</label>
                    <div className={styles.inputWrapper}>
                        <Calendar className={styles.inputIcon} size={20} />
                        <input
                            type="date"
                            {...register("dateOfBirth")}
                        />
                    </div>
                    {errors.dateOfBirth && <p className={styles.errorText}>{errors.dateOfBirth.message}</p>}
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
                            {...register("levelOfKorean", { valueAsNumber: true })}
                        />
                    </div>
                    {errors.levelOfKorean && <p className={styles.errorText}>{errors.levelOfKorean.message}</p>}
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
                        {loadingLanguages ? (
                            <p>Loading languages...</p>
                        ) : languageError ? (
                            <p className={styles.errorText}>Failed to load languages</p>
                        ) : (
                            languages.map((lang) => (
                                <span
                                    key={lang.id}
                                    className={`${styles.tag} ${selectedLanguageIds.includes(lang.id) ? styles.activeTag : ""}`}
                                    onClick={() => toggleLanguage(lang.id)}
                                >
                                    {lang.name}
                                </span>
                            ))
                        )}
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
