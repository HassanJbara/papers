import { Category, Paper, Tag } from "@/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PDFStoreState {
  papers: Paper[];
  categories: Category[];
  tags: Tag[];
  getPaperById: (id: string) => Paper | undefined;
  addPaper: (paper: Paper) => void;
  setPapers: (papers: Paper[]) => void;
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  resetState: () => void;
}

const usePDFStore = create<PDFStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        papers: [],
        categories: [],
        tags: [],
        getPaperById: (id: string) =>
          get().papers.find((paper) => paper.id === parseInt(id)),
        setPapers: (papers: Paper[]) => set({ papers }),
        addPaper: (paper: Paper) =>
          set((state) => ({ papers: [...state.papers, paper] })),
        setCategories: (categories: Category[]) => set({ categories }),
        addCategory: (category: Category) =>
          set((state) => ({ categories: [...state.categories, category] })),
        setTags: (tags: Tag[]) => set({ tags }),
        addTag: (tag: Tag) => set((state) => ({ tags: [...state.tags, tag] })),
        resetState: () => set({ papers: [], categories: [], tags: [] }),
      }),
      {
        name: "pdf-store",
      }
    )
  )
);

export default usePDFStore;
