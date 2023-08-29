import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Utils
import { UserType } from "../utils/types";

interface UserState {
  users: UserType[];
  addUser: (users: UserType) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => set((state) => ({ users: state.users.concat(user) })),
    }),
    {
      name: "user-storage",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
