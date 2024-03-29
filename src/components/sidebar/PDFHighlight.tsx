import type { IHighlight } from "react-pdf-highlighter";
import { ReactSVG } from "react-svg";

import { useHighlightsStore, useUserStore } from "@/stores";

interface Props {
  paperId: number;
  highlight: IHighlight;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function PDFHighlight({ highlight, paperId }: Props) {
  const { removeHighlight, removeHighlightOffline } = useHighlightsStore(
    (state) => state
  );
  const { user } = useUserStore((state) => state);

  function remove() {
    if (user) {
      removeHighlight(highlight.id);
    } else {
      removeHighlightOffline(paperId, highlight.id);
    }
  }

  return (
    <div className="indicator w-11/12 h-32">
      <div className="indicator-item">
        <button
          title="Remove highlight"
          className="btn btn-error btn-outline btn-circle btn-sm"
          onClick={remove}
        >
          <ReactSVG
            src="/icons/x.svg"
            className="w-3 h-3 fill-current mb-0.5"
          />
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
          <h2 className="card-title ">
            <p className="text-ellipsis whitespace-nowrap overflow-hidden inline-block">
              {highlight.comment.text}
            </p>

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
