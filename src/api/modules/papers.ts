import type { PaperRequest, Paper } from "@/types";
import { axiosAPI } from "@/api/axios";

import type { AxiosPromise } from "axios";

const papers = {
  getAll: (): AxiosPromise<Array<Paper>> => {
    return axiosAPI.get("/pdfs");
  },
  getOne: (id: number): AxiosPromise<Paper> => {
    return axiosAPI.get(`/pdfs/${id}`);
  },
  create: (paper: PaperRequest): AxiosPromise<void> => {
    return axiosAPI.post("/pdfs", paper);
  },
  update: (id: number, paper: PaperRequest): AxiosPromise<void> => {
    return axiosAPI.put(`/pdfs/${id}`, paper);
  },
  updateTags: (id: number, tags: Array<number>): AxiosPromise<void> => {
    return axiosAPI.put(`/pdfs/${id}/tags`, { tags: tags });
  },
  delete: (id: number): AxiosPromise<void> => {
    return axiosAPI.delete(`/pdfs/${id}`);
  },
};

export default papers;
