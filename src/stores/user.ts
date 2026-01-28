import { create } from "zustand";
import type { UserStore } from "../types/store/user";

const USER_KEY = "user";

const getUserFromStorage = () => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const useUserStore = create<UserStore>((set) => ({
  user: getUserFromStorage(),
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem(USER_KEY);
    set({ user: null });
  },
}));
