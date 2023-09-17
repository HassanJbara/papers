import { PDFHighlight } from "@/components/sidebar";
import { usePDFStore } from "@/stores";

export function Sidebar() {
  const { highlights, setHighlights } = usePDFStore((state) => state);

  return (
    <div className="drawer-side z-50 w-fit">
      <label htmlFor="my-drawer" className="drawer-overlay" />

      <aside className="h-full flex flex-col gap-4 p-4 overflow-auto no-scrollbar">
        {highlights.map((highlight, index) => (
          <PDFHighlight key={index} highlight={highlight} />
        ))}

        {highlights.length > 0 ? (
          <button
            className="btn btn-warning w-1/2 self-center"
            onClick={() => setHighlights([])}
          >
            Reset highlights
          </button>
        ) : null}
      </aside>
    </div>
  );
}
