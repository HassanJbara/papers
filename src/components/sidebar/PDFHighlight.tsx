import { useHighlightsStore } from "@/stores";
import type { IHighlight } from "react-pdf-highlighter";

interface Props {
  paperId: number;
  highlight: IHighlight;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function PDFHighlight({ highlight, paperId }: Props) {
  const { removeHighlight } = useHighlightsStore((state) => state);

  return (
    <div className="indicator w-96">
      <div className="indicator-item">
        <button
          className="btn btn-error btn-outline btn-circle btn-sm"
          onClick={() => removeHighlight(paperId, highlight.id)}
        >
          X
        </button>
      </div>

      <div
        className="card card-compact bg-base-300 shadow-xl w-full"
        onClick={() => {
          updateHash(highlight);
        }}
      >
        {highlight.content.image ? (
          <figure>
            <img src={highlight.content.image} alt={"Screenshot"} />
          </figure>
        ) : null}

        <div className="card-body">
          <h2 className="card-title">
            {highlight.comment.text}

            <div className="badge badge-outline badge-secondary">
              {highlight.position.pageNumber}
            </div>
          </h2>

          {highlight.content.text ? (
            <p>{`${highlight.content.text.slice(0, 90).trim()}…`}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
