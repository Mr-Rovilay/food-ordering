import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";

const API_END_POINT = "http://localhost:5000/api/user";

const axiosInstance = axios.create({
    baseURL: API_END_POINT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

type User = {
    fullname: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    bio: string;
    joinedAt: Date;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
}

type UpdateProfileInput = Partial<Omit<User, 'admin' | 'isVerified' | 'joinedAt'>>;

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: Omit<SignupInputState, 'confirmPassword'>) => Promise<{ success: boolean }>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<boolean>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: UpdateProfileInput) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    signup: async (input) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/signup', input);
            if (response.data.success) {
                set({ 
                    loading: false,
                    user: response.data.user,
                    isAuthenticated: true 
                });
                toast.success(response.data.message || "Signup successful");
                return { success: true };
            } else {
                throw new Error(response.data.message || "Signup failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during signup");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during signup");
            }
            return { success: false };
        }
    },

    login: async (input: LoginInputState) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/login', input);
            if (response.data.success) { 
                set({ loading: false, user: response.data.user, isAuthenticated: true });
                toast.success(response.data.message || "Login successful");
            } else {
                throw new Error(response.data.message || "Login failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during login");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during login");
            }
        }
    },

    verifyEmail: async (verificationCode: string) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/verify-email', { verificationCode });
            if (response.data.success) {
                set({ loading: false, user: response.data.user, isAuthenticated: true });
                toast.success(response.data.message || "Email verified successfully");
                return true;
            } else {
                throw new Error(response.data.message || "Email verification failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during email verification");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during email verification");
            }
            return false;
        }
    },

    checkAuthentication: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/check-auth');
            if (response.data.success) {
                set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            } else {
                throw new Error("Authentication check failed");
            }
        } catch (error) {
            set({isAuthenticated: false, isCheckingAuth: false });
            console.error("Authentication check error:", error);
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/logout');
            if (response.data.success) {
                set({ loading: false, user: null, isAuthenticated: false });
                toast.success(response.data.message || "Logout successful");
            } else {
                throw new Error(response.data.message || "Logout failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during logout");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during logout");
            }
        }
    },

    forgotPassword: async (email: string) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/forgot-password', { email });
            if (response.data.success) {
                set({ loading: false });
                toast.success(response.data.message || "Password reset email sent");
            } else {
                throw new Error(response.data.message || "Password reset request failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during password reset request");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during password reset request");
            }
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post(`/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                set({ loading: false });
                toast.success(response.data.message || "Password reset successful");
            } else {
                throw new Error(response.data.message || "Password reset failed");
            }
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during password reset");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred during password reset");
            }
        }
    },

    updateProfile: async (input: UpdateProfileInput) => {
        try { 
            const response = await axiosInstance.put('/profile/update', input);
            if (response.data.success) {
                set({user: response.data.user, isAuthenticated: true});
                toast.success(response.data.message || "Profile updated successfully");
            } else {
                throw new Error(response.data.message || "Profile update failed");
            }
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred while updating profile");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred while updating profile");
            }
        }
    }
}),
{
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
}
))