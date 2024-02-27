import type { AxiosPromise } from "axios";

import { axiosAPI } from "@/api/axios";
import type { HighlightRequest } from "@/types";
import type { IHighlight } from "react-pdf-highlighter";

const highlights = {
  getAll: (): AxiosPromise<Array<IHighlight>> => {
    return axiosAPI.get("highlights");
  },
  getOne: (id: number): AxiosPromise<IHighlight> => {
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
