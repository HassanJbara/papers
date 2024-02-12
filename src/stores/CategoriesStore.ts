import api from "@/api";
import type { Category } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface CategoriesStoreState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (categoryId: number) => void;
  fillCategories: () => void;
  resetState: () => void;
}

const useCategoriesStore = create<CategoriesStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        setCategories: (categories: Category[]) => set({ categories }),
        addCategory: async (category: Omit<Category, "id">) => {
          try {
            await api.categories
              .create(category)
              .then(() => get().fillCategories());
          } catch (error) {
            console.log(error);
          }
        },
        removeCategory: async (categoryId: number) => {
          try {
            await api.categories
              .delete(categoryId)
              .then(() => get().fillCategories());
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
        resetState: () => set({ categories: [] }),
      }),
      {
        name: "categories-store",
      }
    )
  )
);

export default useCategoriesStore;
