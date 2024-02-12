import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type { User } from "@/types";

const users = {
  auth: (
    username: string,
    password: string
  ): AxiosPromise<{ message: number | string }> => {
    return axiosAPI.post("users/login", { username, password });
  },
  create: (user: Omit<User, "id">): AxiosPromise<void> => {
    return axiosAPI.post("users", user);
  },
  delete: (id: number): AxiosPromise<void> => {
    return axiosAPI.delete("users/" + id.toString());
  },
};

export default users;
