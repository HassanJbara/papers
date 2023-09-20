import type { IHighlight } from "react-pdf-highlighter";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HighlightsStoreState {
  highlights: { paperId: number; highlights: IHighlight[] }[];
  setHighlights: (
    highlights: { paperId: number; highlights: IHighlight[] }[]
  ) => void;
  addHighlight: (paperId: number, highlight: IHighlight) => void;
  setPaperHighlights: (paperId: number, highlights: IHighlight[]) => void;
  removeHighlight: (paperId: number, highlightId: string) => void;
  getHighlightById: (
    paperIid: number,
    highlightId: string
  ) => IHighlight | undefined;
  getPaperHighlights: (paperId: number) => IHighlight[];
}

const useHighlightsStore = create<HighlightsStoreState>()(
  persist(
    (set, get) => ({
      highlights: [],
      setHighlights: (
        highlights: { paperId: number; highlights: IHighlight[] }[]
      ) => set({ highlights }),
      addHighlight: (paperId: number, highlight: IHighlight) =>
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
    }),
    {
      name: "highlights-store",
    }
  )
);

export default useHighlightsStore;
