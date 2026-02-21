import { useState, useCallback } from "react";
import type { ModalType } from "../components/ui/Modal/Modal";

interface ModalState {
    isOpen: boolean;
    type: ModalType;
    title?: string;
    message: string;
    confirmLabel?: string;
}

const DEFAULT_STATE: ModalState = {
    isOpen: false,
    type: "info",
    message: "",
};

export const useModal = () => {
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);

    const showModal = useCallback(
        (
            message: string,
            type: ModalType = "info",
            title?: string,
            confirmLabel?: string
        ) => {
            setModalState({ isOpen: true, type, message, title, confirmLabel });
        },
        []
    );

    const showSuccess = useCallback(
        (message: string, title?: string, confirmLabel?: string) =>
            showModal(message, "success", title, confirmLabel),
        [showModal]
    );

    const showError = useCallback(
        (message: string, title?: string, confirmLabel?: string) =>
            showModal(message, "error", title, confirmLabel),
        [showModal]
    );

    const showInfo = useCallback(
        (message: string, title?: string, confirmLabel?: string) =>
            showModal(message, "info", title, confirmLabel),
        [showModal]
    );

    const closeModal = useCallback(() => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    }, []);

    return {
        modalState,
        showModal,
        showSuccess,
        showError,
        showInfo,
        closeModal,
    };
};
