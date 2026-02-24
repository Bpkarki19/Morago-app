import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '../schemas/Schema';
import { useNavigate } from 'react-router-dom';
import { changePasswordRequest } from '../api/auth';
import { isAxiosError } from 'axios';
import { useModal } from './useModal';

export const useUpdatePassword = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { modalState, showSuccess, closeModal } = useModal();
    const wasSuccessRef = useRef(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = useCallback(async (data: ChangePasswordSchema) => {
        setError(null);
        try {
            await changePasswordRequest(data);
            wasSuccessRef.current = true;
            showSuccess("Your password has been updated successfully!", "Password Updated");
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to update password');
            } else {
                setError('An unexpected error occurred');
            }
        }
    }, [showSuccess]);

    const handleModalClose = () => {
        closeModal();
        if (wasSuccessRef.current) {
            wasSuccessRef.current = false;
            navigate('/profile');
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        error,
        serverError: error,
        modalState,
        handleModalClose,
    };
};
