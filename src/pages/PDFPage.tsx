import { useEffect, useState, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
  IHighlight,
} from "react-pdf-highlighter";

import { Spinner, HighlightOptions } from "@/components";
import { Sidebar } from "@/components/sidebar";
import { usePDFStore } from "@/stores";
import { usePDF } from "@/hooks";
import { PAPERS } from "@/papers";

interface Props {
  pdfId: string;
}

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";

const searchParams = new URLSearchParams(document.location.search);
const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

function updateHighlight(
  highlightId: string,
  position: object,
  content: object,
  highlights: IHighlight[],
  setHighlights: (highlights: IHighlight[]) => void
) {
  console.log("Updating highlight", highlightId, position, content);

  setHighlights(
    highlights.map((h) => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h;

      return id === highlightId
        ? {
            id,
            position: { ...originalPosition, ...position },
            content: { ...originalContent, ...content },
            ...rest,
          }
        : h;
    })
  );
}

export function PDFPage(pdfId: Props) {
  const [url, setUrl] = useState(initialUrl);
  const { highlights, setHighlights, addHighlight, getHighlightById } =
    usePDFStore((state) => state);
  const { resetHash, parseIdFromHash, getNewId } = usePDF();

  const scrollViewerTo = useRef((highlight: any) => {});

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo.current(highlight);
    }
  };

  const paper = PAPERS.find((paper) => paper.id === parseInt(pdfId.pdfId));

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
  }, []);

  return paper ? (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content overflow-y-auto h-full relative">
        <PdfLoader url={paper.paperLink} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              pdfScaleValue="page-width"
              scrollRef={(scrollTo) => {
                scrollViewerTo.current = scrollTo;

                scrollToHighlightFromHash();
              }}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection
              ) => (
                <HighlightOptions
                  onOpen={transformSelection}
                  onConfirm={(comment) => {
                    addHighlight({
                      content,
                      position,
                      comment,
                      id: getNewId(),
                    });
                    hideTipAndSelection();
                  }}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo
              ) => {
                const isTextHighlight = !(
                  highlight.content && highlight.content.image
                );

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) },
                        highlights,
                        setHighlights
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, (highlight) => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                    children={component}
                  />
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>

      <Sidebar />
    </div>
  ) : null;
}
