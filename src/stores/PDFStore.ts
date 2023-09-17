import { IHighlight } from "react-pdf-highlighter";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PDFStoreState {
  highlights: IHighlight[];
  setHighlights: (highlights: IHighlight[]) => void;
  addHighlight: (highlight: IHighlight) => void;
  getHighlightById: (id: string) => IHighlight | undefined;
}

const usePDFStore = create<PDFStoreState>()(
  persist(
    (set, get) => ({
      highlights: [],
      setHighlights: (highlights: IHighlight[]) => set({ highlights }),
      addHighlight: (highlight: IHighlight) =>
        set((state) => ({ highlights: [...state.highlights, highlight] })),
      getHighlightById: (id: string) =>
        get().highlights.find((highlight) => highlight.id === id),
    }),
    {
      name: "pdf-store",
    }
  )
);

export default usePDFStore;