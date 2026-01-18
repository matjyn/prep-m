import { create } from "zustand";
import type { UserStore } from "../types/store/user";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
