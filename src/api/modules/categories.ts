import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type { Category } from "@/types";

const categories = {
  getAll: (): AxiosPromise<Array<Category>> => {
    return axiosAPI.get("categories");
  },
  getOne: (id: number): AxiosPromise<Category> => {
    return axiosAPI.get("categories/" + id.toString());
  },
  create: (category: Omit<Category, "id">): AxiosPromise<void> => {
    return axiosAPI.post("categories", category);
  },
  delete: (id: number): AxiosPromise<void> => {
    return axiosAPI.delete("categories/" + id.toString());
  },
};

export default categories;
