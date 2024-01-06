import api from "@/api";
import type { Category, PaperRequest, Paper, Tag } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PDFStoreState {
  papers: Paper[];
  categories: Category[];
  tags: Tag[];
  setPapers: (papers: Paper[]) => void;
  addPaper: (paper: PaperRequest) => void;
  removePaper: (paperId: number) => void;
  updatePaper: (id: number, paper: PaperRequest) => void;
  getPaperById: (id: string) => Paper | undefined;
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (categoryId: number) => void;
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  removeTag: (tagId: number) => void;
  fillTags: () => void;
  fillPapers: () => void;
  fillCategories: () => void;
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
        setCategories: (categories: Category[]) => set({ categories }),
        addCategory: async (category: Omit<Category, "id">) => {
          try {
            await api.categories.create(category);
            get().fillCategories();
          } catch (error) {
            console.log(error);
          }
        },
        removeCategory: async (categoryId: number) => {
          try {
            await api.categories.delete(categoryId);
            get().fillCategories();
          } catch (error) {
            console.log(error);
          }
        },
        setTags: (tags: Tag[]) => set({ tags }),
        addTag: async (tag: Omit<Tag, "id">) => {
          try {
            await api.tags.create(tag);
            get().fillTags();
          } catch (error) {
            console.log(error);
          }
        },
        removeTag: async (tagId: number) => {
          try {
            await api.tags.delete(tagId);
            get().fillTags();
          } catch (error) {
            console.log(error);
          }
        },
        fillTags: async () => {
          try {
            const tagsData = await api.tags.getAll();
            set({ tags: tagsData.data });
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
        fillCategories: async () => {
          try {
            const categoriesData = await api.categories.getAll();

            set({ categories: categoriesData.data });
          } catch (error) {
            console.log(error);
          }
        },
        resetState: () => set({ papers: [], categories: [], tags: [] }),
      }),
      {
        name: "pdf-store",
      }
    )
  )
);

export default usePDFStore;
