import { useEffect, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";
import { ReactSVG } from "react-svg";

import { Sidebar } from "@/components/sidebar";
import { HighlightOptions } from "@/components";
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
    <div className="drawer xl:drawer-open">
      <input
        title="drawer-checkbox"
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content overflow-y-auto min-h-screen relative">
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost drawer-button xl:hidden fixed top-2 left-2 z-50"
        >
          <ReactSVG src="/icons/menu.svg" className="h-10 w-10 fill-current" />
        </label>

        <PdfLoader
          url={paper.link}
          beforeLoad={
            <div className="h-screen w-full items-center justify-center flex flex-row">
              <span className="loading loading-ring loading-lg " />
            </div>
          }
          errorMessage={
            <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
              <ReactSVG
                src="/icons/error.svg"
                className="w-10 h-10 fill-current"
              />
              <span className="font-bold text-2xl text-base-content">
                Could not find the requested PDF
              </span>
            </div>
          }
        >
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
                    addHighlight({
                      position: position,
                      comment: comment.text,
                      comment_emoji: comment.emoji,
                      text: content.text || "",
                      image: content.image || "",
                      pdf_id: parseInt(props.pdfId),
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
