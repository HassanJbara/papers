import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IHighlight } from "react-pdf-highlighter";

import api from "@/api";
import type { HighlightRequest } from "@/types";

interface HighlightsStoreState {
  highlights: IHighlight[];
  papersHighlights: { paperId: number; highlights: IHighlight[] }[];
  setHighlights: (highlights: IHighlight[]) => void;
  setPapersHighlights: (
    papersHighlights: { paperId: number; highlights: IHighlight[] }[]
  ) => void;
  addHighlight: (highlightRequest: HighlightRequest) => void;
  addHighlightOffline: (paperId: number, highlight: IHighlight) => void;
  setPaperHighlights: (paperId: number, highlights: IHighlight[]) => void;
  removeHighlight: (highlightId: string) => void;
  removeHighlightOffline: (paperId: number, highlightId: string) => void;
  getHighlightById: (highlightId: string) => IHighlight | undefined;
  getPaperHighlights: (paperId: number) => IHighlight[];
  fillHighlights: () => Promise<void>;
  resetState: () => void;
}

const useHighlightsStore = create<HighlightsStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        highlights: [],
        papersHighlights: [],
        setHighlights: (highlights: IHighlight[]) => set({ highlights }),
        setPapersHighlights: (
          papersHighlights: { paperId: number; highlights: IHighlight[] }[]
        ) => set({ papersHighlights: papersHighlights }),
        addHighlight: async (highlightRequest: HighlightRequest) => {
          try {
            await api.highlights
              .create(highlightRequest)
              .then(() => get().fillHighlights());
          } catch (error) {
            console.log(error);
          }
        },
        addHighlightOffline: (paperId: number, highlight: IHighlight) =>
          set((state) => ({
            highlights: state.highlights,
            papersHighlights: [
              ...state.papersHighlights.filter((h) => h.paperId !== paperId),
              {
                paperId: paperId,
                highlights: [
                  ...(state.papersHighlights.find((h) => h.paperId === paperId)
                    ?.highlights || []),
                  highlight,
                ],
              },
            ],
          })),
        setPaperHighlights: (paperId: number, highlights: IHighlight[]) =>
          get().setPapersHighlights([
            ...get().papersHighlights.filter((h) => h.paperId !== paperId),
            { paperId: paperId, highlights: highlights },
          ]),
        removeHighlight: async (highlightId: string) => {
          try {
            await api.highlights
              .delete(parseInt(highlightId))
              .then(() => get().fillHighlights());
          } catch (error) {
            console.log(error);
          }
        },
        removeHighlightOffline: (paperId: number, highlightId: string) =>
          get().setPaperHighlights(
            paperId,
            get()
              .getPaperHighlights(paperId)
              .filter((h) => h.id.toString() !== highlightId)
          ),
        getHighlightById: (highlightId: string) =>
          get().highlights.find(
            (highlight) => highlight.id.toString() === highlightId
          ),
        getPaperHighlights: (paperId: number) =>
          get().papersHighlights.find((pH) => pH.paperId === paperId)
            ?.highlights || [],
        fillHighlights: async () => {
          return new Promise((resolve, reject) => {
            api.papers
              .getAll()
              .then((response) => {
                response.data.forEach((paper) => {
                  get().setPaperHighlights(paper.id, paper.highlights);
                });
              })
              .catch((error) => {
                console.log(error);
                reject();
              });
            api.highlights
              .getAll()
              .then((response) => {
                get().setHighlights(response.data);
              })
              .catch((error) => {
                console.log(error);
                reject();
              });
            resolve();
          });
        },
        resetState: () => set({ highlights: [] }),
      }),
      {
        name: "highlights-store",
      }
    )
  )
);

export default useHighlightsStore;
