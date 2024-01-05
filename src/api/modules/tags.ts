import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type { Tag } from "@/types";

const tags = {
  getAll: (): AxiosPromise<Array<Tag>> => {
    return axiosAPI.get("tags");
  },
  getOne: (id: number): AxiosPromise<Tag> => {
    return axiosAPI.get("tags/" + id.toString());
  },
  create: (tag: Omit<Tag, "id">): AxiosPromise<void> => {
    return axiosAPI.post("tags", tag);
  },
  delete: (id: number): AxiosPromise<void> => {
    return axiosAPI.delete("tags/" + id.toString());
  },
};

export default tags;
