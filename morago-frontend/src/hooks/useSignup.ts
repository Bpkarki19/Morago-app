import { useState } from "react";
import { isAxiosError } from "axios";
import { signupRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "../schemas/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupSchema>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            phone: "",
            password: "",
            confirmPassword: "",
            role: ""
        }
    });

    const onSubmit = async (formData: SignupSchema) => {
        setError(null);
        try {
            const response = await signupRequest(formData);
            localStorage.setItem("token", response.token);
            navigate('/home')
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || 'Signup failed');
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
    }
};

export default useSignup;
