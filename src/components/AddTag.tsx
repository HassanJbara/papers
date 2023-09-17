import { useState } from "react";

import { usePDFStore } from "@/stores";
import { getNewId, getTagColor } from "@/utils";

export function AddTag() {
  const { addTag } = usePDFStore((state) => state);
  const [tagName, setTagName] = useState("");
  const changeTagName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagName(e.target.value);

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="Tag Name"
          className="input input-bordered w-full"
          onChange={changeTagName}
        />
      </div>

      <div className="modal-action flex flex-row w-full justify-around">
        <button
          className="btn btn-primary"
          onClick={() =>
            addTag({
              id: parseInt(getNewId()),
              name: tagName,
              color: getTagColor(),
            })
          }
        >
          Add Tag
        </button>

        <form method="dialog">
          <button className="btn btn-warning">Cancel</button>
          {/* if there is a button in form, it will close the modal */}
        </form>
      </div>
    </div>
  );
}
