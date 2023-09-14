import { IHighlight } from "react-pdf-highlighter";

interface Props {
  highlight: IHighlight;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function PDFHighlight({ highlight }: Props) {
  return (
    <div
      className="card card-compact bg-base-300 shadow-xl w-96"
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
  );
}
