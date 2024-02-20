import api from "@/api";
import type { Category } from "@/types";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface CategoriesStoreState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  addCategoryOffline: (category: Omit<Category, "id" | "user_id">) => void;
  removeCategory: (categoryId: number) => void;
  removeCategoryOffline: (categoryId: number) => void;
  fillCategories: () => Promise<void>;
  syncCategories: () => void;
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
        addCategoryOffline: (category: Omit<Category, "id" | "user_id">) => {
          const categories = get().categories;
          const newCategory = {
            ...category,
            id: categories.length + 1,
            user_id: null,
          };
          set({ categories: [...categories, newCategory] });
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
        removeCategoryOffline: (categoryId: number) => {
          const categories = get().categories;
          const newCategories = categories.filter(
            (category) => category.id !== categoryId
          );
          set({ categories: newCategories });
        },
        fillCategories: async () => {
          return new Promise((resolve, reject) => {
            api.categories
              .getAll()
              .then((categoriesData) => {
                set({ categories: categoriesData.data });
                resolve();
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        },
        syncCategories: async () => {
          // TODO: implement syncCategories
          return;
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
