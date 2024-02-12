import api from "@/api";
import type { PaperRequest, Paper } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PDFStoreState {
  papers: Paper[];
  setPapers: (papers: Paper[]) => void;
  addPaper: (paper: PaperRequest) => void;
  removePaper: (paperId: number) => void;
  updatePaper: (id: number, paper: PaperRequest) => void;
  getPaperById: (id: string) => Paper | undefined;
  fillPapers: () => void;
  resetState: () => void;
}

const usePDFStore = create<PDFStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        papers: [],
        getPaperById: (id: string) =>
          get().papers.find((paper) => paper.id === parseInt(id)),
        setPapers: (papers: Paper[]) => set({ papers }),
        addPaper: async (paper: PaperRequest) => {
          try {
            await api.papers.create(paper).then(() => get().fillPapers());
          } catch (error) {
            console.log(error);
          }
        },
        updatePaper: async (id: number, paper: PaperRequest) => {
          try {
            await api.papers.update(id, paper);
            get().fillPapers();
          } catch (error) {
            console.log(error);
          }
        },
        removePaper: async (paperId: number) => {
          try {
            await api.papers.delete(paperId);
            get().fillPapers();
          } catch (error) {
            console.log(error);
          }
        },
        fillPapers: async () => {
          try {
            const papersData = await api.papers.getAll();
            set({ papers: papersData.data });
          } catch (error) {
            console.log(error);
          }
        },
        resetState: () => set({ papers: [] }),
      }),
      {
        name: "pdf-store",
      }
    )
  )
);

export default usePDFStore;
