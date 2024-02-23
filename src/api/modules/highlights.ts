import type { AxiosPromise } from "axios";

import { axiosAPI } from "@/api/axios";
import type { Highlight, HighlightRequest } from "@/types";

const highlights = {
  getAll: (): AxiosPromise<Array<Highlight>> => {
    return axiosAPI.get("highlights");
  },
  getOne: (id: number): AxiosPromise<Highlight> => {
    return axiosAPI.get("highlights/" + id.toString());
  },
  create: (highlight: HighlightRequest): AxiosPromise<void> => {
    return axiosAPI.post("highlights", highlight);
  },
  delete: (id: number): AxiosPromise<void> => {
    return axiosAPI.delete("highlights/" + id.toString());
  },
};

export default highlights;
