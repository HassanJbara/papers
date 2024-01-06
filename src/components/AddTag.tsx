import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import { usePDFStore } from "@/stores";
import { getTagColor } from "@/utils";
import type { Tag } from "@/types";

interface Props {
  closeModal: () => void;
}

export function AddTag(props: Props) {
  const { addTag, fillTags, removeTag, tags } = usePDFStore((state) => state);
  const [tagName, setTagName] = useState("");
  const [showError, setShowError] = useState(false);
  const changeTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setTagName(e.target.value);
  };
  function clearFields() {
    setTagName("");
  }

  function cancel() {
    clearFields();
    props.closeModal();
  }

  function add() {
    // check if tag name is empty
    if (!tagName) {
      setShowError(true);
      return;
    }

    addTag({
      name: tagName,
      color: getTagColor(),
    });

    clearFields();
  }

  function getColorClass(tag: Tag) {
    // use colors from utils/colors to get a color for the tag
    switch (tag.color) {
      case "primary":
        return "bg-primary text-primary-content";
      case "secondary":
        return "bg-secondary text-secondary-content";
      case "accent":
        return "bg-accent text-accent-content";
      case "neutral":
        return "bg-neutral text-neutral-content";
      case "success":
        return "bg-success text-success-content";
      case "warning":
        return "bg-warning text-warning-content";
      case "error":
        return "bg-error text-error-content";
      default:
        return "bg-primary text-primary-content";
    }
  }

  useEffect(() => {
    fillTags();
  }, []);

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="Tag Name"
          className={
            "input input-bordered w-full " + (showError ? "input-error" : "")
          }
          value={tagName}
          onChange={changeTagName}
        />

        <div className="mt-4 mb-2 text-xl font-bold text-base-content">
          Current Tags:
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              className={
                "flex flex-row gap-2 w-fit h-fit py-1 pr-3 items-center rounded-full " +
                getColorClass(tag)
              }
              key={tag.id}
            >
              <button
                title="Remove Tag"
                className="btn btn-ghost btn-sm self-start btn-circle"
                onClick={() => removeTag(tag.id)}
              >
                <ReactSVG src="/icons/xmark.svg" className="w-4 h-4 mb-0.5" />
              </button>

              <span className="font-semibold">{tag.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-action flex flex-row w-full justify-around">
        <button className="btn btn-primary" onClick={add}>
          Add
        </button>

        <button className="btn btn-success" onClick={fillTags}>
          Refresh
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
