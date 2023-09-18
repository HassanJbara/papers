import { useState } from "react";
import { ReactSVG } from "react-svg";

import { usePDFStore } from "@/stores";
import { getNewId, getTagColor } from "@/utils";

interface Props {
  closeModal: () => void;
}

export function AddTag(props: Props) {
  const { addTag, resetTags, removeTag, tags } = usePDFStore((state) => state);
  const [tagName, setTagName] = useState("");
  const changeTagName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagName(e.target.value);

  function clearFields() {
    setTagName("");
  }

  function cancel() {
    clearFields();
    props.closeModal();
  }

  function add() {
    addTag({
      id: parseInt(getNewId()),
      name: tagName,
      color: getTagColor(),
    });

    clearFields();

    props.closeModal();
  }

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="Tag Name"
          className="input input-bordered w-full"
          value={tagName}
          onChange={changeTagName}
        />

        <div className="mt-4 mb-2 text-xl font-bold text-base-content">
          Current Tags:
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              className="flex flex-row gap-2 bg-info w-fit h-fit py-1 pr-3 items-center rounded-full"
              key={tag.id}
            >
              <button
                title="Remove Tag"
                className="btn btn-info btn-sm self-start btn-circle"
                onClick={() => removeTag(tag.id)}
              >
                <ReactSVG
                  src="/icons/x.svg"
                  className="w-4 h-4 text-info-content fill-current"
                />
              </button>

              <span className="text-info-content font-semibold">
                {tag.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-action flex flex-row w-full justify-around">
        <button className="btn btn-primary" onClick={add}>
          Add
        </button>

        <button className="btn btn-error" onClick={resetTags}>
          Reset
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
