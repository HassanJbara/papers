import api from "@/api";
import type { User } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserStoreState {
  user: Omit<User, "password"> | null;
  login: (user: Omit<User, "id"> | null) => Promise<void>;
  getUser: () => Omit<User, "password"> | null;
  errorMessage: string | null;
  resetMessage: () => void;
  resetState: () => void;
}

const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        errorMessage: null,
        login: (user: Omit<User, "id"> | null) => {
          return new Promise<void>((resolve, reject) => {
            set({ errorMessage: null });
            if (!user) {
              set({ user: null });
              resolve();
            } else {
              api.users
                .auth(user.username, user.password)
                .then((res) => {
                  set({
                    user: {
                      id: res.data.message as number,
                      username: user.username,
                    },
                  });
                  resolve();
                })
                .catch((error) => {
                  if (error.response) {
                    set({
                      errorMessage: error.response.data.message as string,
                    });
                  } else {
                    set({ errorMessage: "Login Failed." });
                  }
                  reject(error);
                });
            }
          });
        },
        getUser: () => get().user,
        resetMessage: () => {
          set({ errorMessage: null });
        },
        resetState: () => set({ user: null, errorMessage: null }),
      }),
      {
        name: "user-store",
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);

export default useUserStore;
