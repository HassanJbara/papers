import api from "@/api";
import type { User } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserStoreState {
  user: Omit<User, "password"> | null;
  login: (user: Omit<User, "id"> | null) => Promise<void>;
  register: (user: Omit<User, "id">) => Promise<void>;
  getUser: () => Omit<User, "password"> | null;
  resetUser: () => void;
  resetState: () => void;
}

const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        login: (user: Omit<User, "id"> | null) => {
          return new Promise<void>((resolve, reject) => {
            if (!user) {
              set({ user: null });
              resolve();
            } else {
              api.users
                .auth(user.username, user.password)
                .then((res) => {
                  set({
                    user: {
                      id: parseInt(res.data.message as string), // it is returned as a string from the server
                      username: user.username,
                    },
                  });
                  resolve();
                })
                .catch((error) => {
                  if (error.response) {
                    reject(error.response.data.message);
                  } else {
                    reject("Login Failed.");
                  }
                });
            }
          });
        },
        register: (user: Omit<User, "id">) => {
          return new Promise<void>((resolve, reject) => {
            api.users
              .create(user)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                if (error.response) {
                  reject(error.response.data.message);
                } else {
                  reject("Registration Failed.");
                }
              });
          });
        },
        getUser: () => get().user,
        resetUser: () => set({ user: null }),
        resetState: () => {
          get().resetUser();
        },
      }),
      {
        name: "user-store",
      }
    )
  )
);

export default useUserStore;
