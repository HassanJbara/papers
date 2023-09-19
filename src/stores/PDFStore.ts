import type { Category, Paper, Tag } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PDFStoreState {
  papers: Paper[];
  categories: Category[];
  tags: Tag[];
  setPapers: (papers: Paper[]) => void;
  addPaper: (paper: Paper) => void;
  removePaper: (paperId: number) => void;
  updatePaper: (paper: Paper) => void;
  getPaperById: (id: string) => Paper | undefined;
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  removeCategory: (categoryId: number) => void;
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  removeTag: (tagId: number) => void;
  resetCategories: () => void;
  resetTags: () => void;
  resetPapers: () => void;
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
        updatePaper: (paper: Paper) =>
          get().setPapers(
            get().papers.map((p) => (p.id === paper.id ? paper : p))
          ),
        removePaper: (paperId: number) =>
          get().setPapers(get().papers.filter((paper) => paper.id !== paperId)),
        setCategories: (categories: Category[]) => set({ categories }),
        addCategory: (category: Category) =>
          set((state) => ({ categories: [...state.categories, category] })),
        removeCategory: (categoryId: number) =>
          get().setCategories(
            get().categories.filter((category) => category.id !== categoryId)
          ),
        setTags: (tags: Tag[]) => set({ tags }),
        addTag: (tag: Tag) => set((state) => ({ tags: [...state.tags, tag] })),
        removeTag: (tagId: number) =>
          get().setTags(get().tags.filter((tag) => tag.id !== tagId)),
        resetCategories: () => set({ categories: [] }),
        resetTags: () => set({ tags: [] }),
        resetPapers: () => set({ papers: [] }),
        resetState: () => set({ papers: [], categories: [], tags: [] }),
      }),
      {
        name: "pdf-store",
      }
    )
  )
);

export default usePDFStore;
