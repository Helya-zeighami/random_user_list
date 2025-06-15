import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/app/types/user";

interface UserState {
  favorites: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  addFavorite: (user: User) => void;
  removeFavorite: (uuid: string) => void;
  isFavorite: (uuid: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [],
      selectedUser: null,

      setSelectedUser: (user) => set({ selectedUser: user }),

      addFavorite: (user) => {
        const existing = get().favorites;
        if (!existing.some((u) => u.login.uuid === user.login.uuid)) {
          set({ favorites: [...existing, user] });
        }
      },

      removeFavorite: (uuid) =>
        set((state) => ({
          favorites: state.favorites.filter((u) => u.login.uuid !== uuid),
        })),

      isFavorite: (uuid) =>
        get().favorites.some((u) => u.login.uuid === uuid),
    }),
    {
      name: "user-favorites-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        selectedUser: state.selectedUser,
      }),
    }
  )
);
