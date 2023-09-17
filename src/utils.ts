import { IHighlight } from "react-pdf-highlighter";

const colors = [
  "primary",
  "secondary",
  "accent",
  "neutral-focus",
  "info",
  "success",
  "warning",
  "error",
];

export function getTagColor() {
  let result = colors[0];
  let count = 0;
  for (const prop of colors) if (Math.random() < 1 / ++count) result = prop;
  return result;
}

export const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

export const resetHash = () => {
  document.location.hash = "";
};

export const getNewId = () => String(Math.random()).slice(2);

export function updateHighlight(
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
