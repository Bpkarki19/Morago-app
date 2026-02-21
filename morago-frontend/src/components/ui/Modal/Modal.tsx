import { useEffect, type ReactNode } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import styles from "./Modal.module.css";

export type ModalType = "success" | "error" | "info";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: ModalType;
    title?: string;
    message: string;
    /** Label for the confirm/close button */
    confirmLabel?: string;
}

const ICONS: Record<ModalType, ReactNode> = {
    success: <CheckCircle size={48} strokeWidth={1.5} />,
    error: <XCircle size={48} strokeWidth={1.5} />,
    info: <Info size={48} strokeWidth={1.5} />,
};

const DEFAULT_TITLES: Record<ModalType, string> = {
    success: "Success",
    error: "Error",
    info: "Information",
};

export const Modal = ({
    isOpen,
    onClose,
    type = "info",
    title,
    message,
    confirmLabel = "OK",
}: ModalProps) => {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const resolvedTitle = title ?? DEFAULT_TITLES[type];

    return (
        <div
            className={styles.overlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`${styles.modal} ${styles[type]}`}>
                {/* Close X button */}
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className={`${styles.iconWrapper} ${styles[`icon_${type}`]}`}>
                    {ICONS[type]}
                </div>

                {/* Content */}
                <h2 id="modal-title" className={styles.title}>
                    {resolvedTitle}
                </h2>
                <p className={styles.message}>{message}</p>

                {/* Action button */}
                <button
                    className={`${styles.confirmBtn} ${styles[`btn_${type}`]}`}
                    onClick={onClose}
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};
