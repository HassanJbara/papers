import api from "@/api";
import type { PaperRequest, Paper } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PDFStoreState {
  papers: Paper[];
  setPapers: (papers: Paper[]) => void;
  addPaper: (paper: PaperRequest) => void;
  addPaperOffline: (
    paper: Omit<Paper, "id" | "user_id" | "highlights">
  ) => void;
  removePaper: (paperId: number) => void;
  removePaperOffline: (paperId: number) => void;
  updatePaper: (id: number, paper: PaperRequest) => void;
  updatePaperOffline: (
    id: number,
    paper: Omit<Paper, "id" | "user_id">
  ) => void;
  getPaperById: (id: string) => Paper | undefined;
  fillPapers: () => Promise<void>;
  syncPapers: () => void;
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
        addPaperOffline: (
          paper: Omit<Paper, "id" | "user_id" | "highlights">
        ) => {
          set((state) => ({
            papers: [
              ...state.papers,
              {
                ...paper,
                id: state.papers.length + 1,
                user_id: null,
                highlights: [],
              },
            ],
          }));
        },
        updatePaper: async (id: number, paper: PaperRequest) => {
          try {
            await api.papers.update(id, paper);
            get().fillPapers();
          } catch (error) {
            console.log(error);
          }
        },
        updatePaperOffline: (
          id: number,
          paper: Omit<Paper, "id" | "user_id">
        ) => {
          set((state) => ({
            papers: state.papers.map((p) =>
              p.id === id ? { ...paper, id, user_id: null } : p
            ),
          }));
        },
        removePaper: async (paperId: number) => {
          try {
            await api.papers.delete(paperId);
            get().fillPapers();
          } catch (error) {
            console.log(error);
          }
        },
        removePaperOffline: (paperId: number) => {
          set((state) => ({
            papers: state.papers.filter((paper) => paper.id !== paperId),
          }));
        },
        fillPapers: async () => {
          return new Promise<void>((resolve, reject) => {
            api.papers
              .getAll()
              .then((papersData) => {
                set({ papers: papersData.data });
                resolve();
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        },
        syncPapers: async () => {
          // TODO: Implement syncPapers
          return;
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
