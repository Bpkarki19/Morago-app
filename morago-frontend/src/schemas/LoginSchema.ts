//handle form state and validation
import { z } from "zod";

export const LoginSchema = z.object({
    phone: z.string()
        .trim()
        .min(6, "Phone number must be at least 6 characters long")
        .regex(/^[0-9]+$/, "please enter a valid phone number"),
    password: z.string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .regex(/^[a-zA-Z0-9]+$/, "please enter a valid password"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
