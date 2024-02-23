import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IHighlight } from "react-pdf-highlighter";

import api from "@/api";
import type { HighlightRequest } from "@/types";

interface HighlightsStoreState {
  highlights: { paperId: number; highlights: IHighlight[] }[];
  setHighlights: (
    highlights: { paperId: number; highlights: IHighlight[] }[]
  ) => void;
  addHighlight: (highlightRequest: HighlightRequest) => void;
  addHighlightOffline: (paperId: number, highlight: IHighlight) => void;
  setPaperHighlights: (paperId: number, highlights: IHighlight[]) => void;
  removeHighlight: (paperId: number, highlightId: string) => void;
  getHighlightById: (
    paperIid: number,
    highlightId: string
  ) => IHighlight | undefined;
  getPaperHighlights: (paperId: number) => IHighlight[];
  fillHighlights: () => Promise<void>;
}

const useHighlightsStore = create<HighlightsStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        highlights: [],
        setHighlights: (
          highlights: { paperId: number; highlights: IHighlight[] }[]
        ) => set({ highlights }),
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
            highlights: [
              ...state.highlights.filter((h) => h.paperId !== paperId),
              {
                paperId: paperId,
                highlights: [
                  ...(state.highlights.find((h) => h.paperId === paperId)
                    ?.highlights || []),
                  highlight,
                ],
              },
            ],
          })),
        setPaperHighlights: (paperId: number, highlights: IHighlight[]) =>
          get().setHighlights([
            ...get().highlights.filter((h) => h.paperId !== paperId),
            { paperId: paperId, highlights: highlights },
          ]),
        removeHighlight: (paperId: number, highlightId: string) =>
          get().setPaperHighlights(
            paperId,
            get()
              .getPaperHighlights(paperId)
              .filter((h) => h.id !== highlightId)
          ),
        getHighlightById: (paperIid: number, highlightId: string) =>
          get()
            .highlights.find((highlight) => highlight.paperId === paperIid)
            ?.highlights.find((highlight) => highlight.id === highlightId),
        getPaperHighlights: (paperId: number) =>
          get().highlights.find((highlight) => highlight.paperId === paperId)
            ?.highlights || [],
        fillHighlights: async () => {
          return new Promise((resolve, reject) => {
            api.highlights
              .getAll()
              .then((response) => {
                response.data.forEach((highlight) => {
                  get().addHighlightOffline(highlight.pdf.id, highlight);
                });
                resolve();
              })
              .catch((error) => {
                console.log(error);
                reject();
              });
            resolve();
          });
        },
      }),
      {
        name: "highlights-store",
      }
    )
  )
);

export default useHighlightsStore;
