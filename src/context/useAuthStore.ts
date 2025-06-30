// store/useAuthStore.ts
import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    openLoginDialog: boolean;

    login: (user: User, token: string) => void;
    logout: () => void;
    setOpenLoginDialog: (open: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            openLoginDialog: false,

            login: (user, token) =>
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    openLoginDialog: false, // cerrar el dialog al hacer login
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),

            setOpenLoginDialog: (open) => set({ openLoginDialog: open }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
