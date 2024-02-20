import api from "@/api";
import type { Tag } from "@/types";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TagsStoreState {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  addTagOffline: (tag: Omit<Tag, "id" | "user_id">) => void;
  removeTag: (tagId: number) => void;
  removeTagOffline: (tagId: number) => void;
  fillTags: () => Promise<void>;
  syncTags: () => void;
  resetState: () => void;
}

const useTagsStore = create<TagsStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        tags: [],
        setTags: (tags: Tag[]) => set({ tags }),
        addTag: async (tag: Omit<Tag, "id">) => {
          try {
            await api.tags.create(tag).then(() => get().fillTags());
          } catch (error) {
            console.log(error);
          }
        },
        addTagOffline: (tag: Omit<Tag, "id" | "user_id">) => {
          set((state) => ({
            tags: [
              ...state.tags,
              { ...tag, id: state.tags.length + 1, user_id: null },
            ],
          }));
        },
        removeTag: async (tagId: number) => {
          try {
            await api.tags.delete(tagId).then(() => get().fillTags());
          } catch (error) {
            console.log(error);
          }
        },
        removeTagOffline: (tagId: number) => {
          set((state) => ({
            tags: state.tags.filter((tag) => tag.id !== tagId),
          }));
        },
        fillTags: async () => {
          return new Promise((resolve, reject) => {
            api.tags
              .getAll()
              .then((tagsData) => {
                set({ tags: tagsData.data });
                resolve();
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        },
        syncTags: async () => {
          // TODO: Implement syncTags
          return;
        },
        resetState: () => set({ tags: [] }),
      }),
      {
        name: "tags-store",
      }
    )
  )
);

export default useTagsStore;
