import { useState } from "react";

interface Props {
  onConfirm: (comment: { text: string; emoji: string }) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export function HighlightOptions({ onConfirm, onOpen }: Props) {
  const [compact, setCompact] = useState(true);
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");

  // for TipContainer
  // function componentDidUpdate(currentCompact: boolean, nextCompact: boolean) {
  //   if (onUpdate && currentCompact !== nextCompact) {
  //     onUpdate();
  //   }
  // }

  return (
    <div>
      {compact ? (
        <div
          className="rounded-lg bg-base-100 text-white px-2 py-1 cursor-pointer"
          onClick={() => {
            onOpen();
            setCompact(false);
          }}
        >
          Highlight
        </div>
      ) : (
        <form
          className="card card-compact"
          onSubmit={(event) => {
            event.preventDefault();
            onConfirm({ text, emoji });
          }}
        >
          <div className="card-body rounded-lg flex flex-col gap-6 w-80 p-2 shadow bg-base-100 text-white">
            <textarea
              placeholder="Your comment"
              autoFocus
              value={text}
              onChange={(event) => setText(event.target.value)}
              ref={(node) => {
                if (node) {
                  node.focus();
                }
              }}
            />

            <div className="flex flex-row w-full justify-around">
              {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                <label key={_emoji}>
                  <input
                    checked={emoji === _emoji}
                    type="radio"
                    name="emoji"
                    value={_emoji}
                    onChange={(event) => setEmoji(event.target.value)}
                  />
                  {_emoji}
                </label>
              ))}
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                value="Save"
                title="Submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
