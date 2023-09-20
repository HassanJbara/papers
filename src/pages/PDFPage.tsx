import { useEffect, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";

import { Spinner, HighlightOptions } from "@/components";
import { Sidebar } from "@/components/sidebar";
import { useHighlightsStore, usePDFStore } from "@/stores";
import { getNewId, parseIdFromHash, resetHash, updateHighlight } from "@/utils";

interface Props {
  pdfId: string;
}

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

export function PDFPage(props: Props) {
  const {
    getPaperHighlights,
    setPaperHighlights,
    addHighlight,
    getHighlightById,
  } = useHighlightsStore((state) => state);
  const paper = usePDFStore((state) => state.getPaperById(props.pdfId));
  const highlights = getPaperHighlights(parseInt(props.pdfId));

  const scrollViewerTo = useRef((highlight: any) => {
    return highlight;
  });

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(
      parseInt(props.pdfId),
      parseIdFromHash()
    );

    if (highlight) {
      scrollViewerTo.current(highlight);
    }
  };

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
  });

  return paper ? (
    <div className="drawer">
      <input
        title="drawer-checkbox"
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content overflow-y-auto min-h-screen relative">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>

        <PdfLoader url={paper.paperLink} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
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
                    addHighlight(parseInt(props.pdfId), {
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
                        parseInt(props.pdfId),
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) },
                        highlights,
                        setPaperHighlights
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, () => popupContent)
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

      <Sidebar paperId={parseInt(props.pdfId)} title={paper.title} />
    </div>
  ) : (
    <div>pdf not found</div>
  );
}
