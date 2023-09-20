import { PDFHighlight, SidebarHeader } from "@/components/sidebar";
import { useHighlightsStore } from "@/stores";

interface Props {
  paperId: number;
  title: string;
}

export function Sidebar(props: Props) {
  const { getPaperHighlights, setPaperHighlights } = useHighlightsStore(
    (state) => state
  );
  const highlights = getPaperHighlights(props.paperId);

  return (
    <div className="drawer-side z-50">
      <label htmlFor="my-drawer" className="drawer-overlay" />

      <aside className="h-full flex flex-col gap-4 p-4 overflow-auto no-scrollbar bg-base-100 lg:max-w-none max-w-xs">
        <SidebarHeader title={props.title} />

        {highlights.map((highlight, index) => (
          <PDFHighlight
            key={index}
            highlight={highlight}
            paperId={props.paperId}
          />
        ))}
        {highlights.length > 0 ? (
          <button
            className="btn btn-warning w-1/2 self-center"
            onClick={() => setPaperHighlights(props.paperId, [])}
          >
            Reset highlights
          </button>
        ) : null}
      </aside>
    </div>
  );
}
