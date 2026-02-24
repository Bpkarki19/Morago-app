//manage loading states, error handling and calls the Api

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../schemas/Schema';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth';
import { isAxiosError } from 'axios';
import { useAuth } from './useAuth';

export const useLogin = () => {
  // Local states for UI feedback
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  // Initialize form with Zod validation and default values
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Handle form submission logic
  const onSubmit = async (data: LoginSchema, role?: 'user' | 'translator') => {
    setError(null);//clearing old errors

    try {
      // sendind data to axios
      const response = await loginRequest(data);

      // Store authentication token
      localStorage.setItem('token', response.token);
      const normalizedRole = role === 'translator' ? 'ROLE_TRANSLATOR' : 'ROLE_USER';
      localStorage.setItem('role', normalizedRole);
      setIsAuthenticated(true);
      setUser({ id: 0, name: "", role: normalizedRole });

      // Redirect based on role
      if (role === 'translator') {
        navigate('/translator-profile-edit');
      } else {
        navigate('/home');
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        // Capture and display server-side errors
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // Returning object everything the component needs
  return {
    register,
    onSubmit: (role?: 'user' | 'translator') => handleSubmit((data) => onSubmit(data, role)),
    errors,
    isSubmitting,
    error,
    serverError: error
  };
};