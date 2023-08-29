import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Utils
import { UserType } from "../utils/types";

interface UserState {
  user: UserType | undefined;
  addUser: (user: string) => void;
  toggleFavourites: (recipeId: number) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      addUser: (u) => set({ user: { name: u, favourites: [] } }),
      toggleFavourites: (recipeId) =>
        set((state) => ({
          user: {
            name: state.user?.name,
            favourites: state.user?.favourites.includes(recipeId)
              ? state.user?.favourites.filter((id) => id !== recipeId)
              : state.user?.favourites?.concat(recipeId) ?? [],
          },
        })),
    }),
    {
      name: "user-storage",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
