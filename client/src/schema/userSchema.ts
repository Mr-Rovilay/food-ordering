import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters."),
  contact: z.string()
  .min(11, "Contact number must be at least 11 digits")
  .max(13, "Contact number cannot exceed 13 digits (including +234)")
  .refine((val) => /^(\+234|0)[789][01]\d{8}$/.test(val), {
    message: "Invalid Nigerian phone number format",
  }),
}).refine((input) => input.password === input.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({ 
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters.") 
});

export type LoginInputState = z.infer<typeof userLoginSchema>;