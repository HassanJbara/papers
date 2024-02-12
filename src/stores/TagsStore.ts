import api from "@/api";
import type { Tag } from "@/types";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TagsStoreState {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  removeTag: (tagId: number) => void;
  fillTags: () => void;
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
        removeTag: async (tagId: number) => {
          try {
            await api.tags.delete(tagId).then(() => get().fillTags());
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
      }),
      {
        name: "tags-store",
      }
    )
  )
);

export default useTagsStore;
