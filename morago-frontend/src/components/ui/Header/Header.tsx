import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
    title: string;
    backgroundColor?: string;
    textSize?: string | number;
    textColor?: string;
    arrowColor?: string;
}

export const Header = ({
    title,
    backgroundColor,
    textSize,
    textColor,
    arrowColor = "white"
}: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <header className={styles.pageHeader} style={{ backgroundColor }}>
            <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowLeft size={24} color={arrowColor} />
            </button>
            <h1 className={styles.title} style={{ fontSize: textSize, color: textColor }}>
                {title}
            </h1>
            <div className={styles.spacer}></div>
        </header>
    );
};