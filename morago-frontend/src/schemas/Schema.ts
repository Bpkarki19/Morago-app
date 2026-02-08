//handle form state and validation
import { z } from "zod";

export const phoneSchema = z.string()
    .trim()
    .min(6, "Phone number must be at least 6 characters long")
    .regex(/^[0-9]+$/, "please enter a valid phone number")
export const passwordSchema = z.string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "please enter a valid password")

export const LoginSchema = z.object({
    phone: phoneSchema,
    password: passwordSchema,
});
export const SignupSchema = z.object({
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    role: z.enum(["ROLE_USER", "ROLE_TRANSLATOR"])//making sure it exists!
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
//export types
export type LoginSchema = z.infer<typeof LoginSchema>;
export type SignupSchema = z.infer<typeof SignupSchema>;
