import type { IHighlight } from "react-pdf-highlighter";
import { PDFHighlight } from "@/components/sidebar";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
}

export function Sidebar({ highlights, resetHighlights }: Props) {
  return (
    <div className="drawer-side z-50 w-fit">
      <label htmlFor="my-drawer" className="drawer-overlay" />

      <aside className="h-full flex flex-col gap-4 p-4 overflow-auto no-scrollbar">
        {highlights.map((highlight, index) => (
          <PDFHighlight key={index} highlight={highlight} />
        ))}

        {/* {highlights.length > 0 ? (
          <div>
            <button onClick={resetHighlights}>Reset highlights</button>
          </div>
        ) : null} */}
      </aside>
    </div>
  );
}
