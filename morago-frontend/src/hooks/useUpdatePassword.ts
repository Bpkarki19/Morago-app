import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '../schemas/Schema';
import { useNavigate } from 'react-router-dom';
import { changePasswordRequest } from '../api/auth';
import { isAxiosError } from 'axios';

export const useUpdatePassword = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const onSubmit = async (data: ChangePasswordSchema) => {
        setError(null);
        try {
            await changePasswordRequest(data);
            alert("Password updated successfully!");
            navigate('/profile');
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to update password');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        error,
        serverError: error
    };
};
