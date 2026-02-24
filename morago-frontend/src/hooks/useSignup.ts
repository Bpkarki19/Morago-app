import { useState } from "react";
import { isAxiosError } from "axios";
import { signupRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "../schemas/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";

const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const { setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<SignupSchema>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            phone: "",
            password: "",
            confirmPassword: "",
            role: "ROLE_USER"//default role
        }
    });

    const onSubmit = async (formData: SignupSchema) => {
        setError(null);
        try {
            const response = await signupRequest(formData);
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", formData.role);
            setIsAuthenticated(true);
            setUser({ id: 0, name: "", role: formData.role });
            navigate('/result', { state: { status: 'success', type: 'signup', role: formData.role } });
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
        serverError: error,
        setValue
    }
};

export default useSignup;
