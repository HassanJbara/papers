import { useState } from "react";

import { usePDFStore } from "@/stores";
import { getNewId } from "@/utils";

export function AddCategory() {
  const { addCategory, resetCategories } = usePDFStore((state) => state);
  const [categoryName, setCategoryName] = useState("");
  const changeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategoryName(e.target.value);

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="Category Name"
          className="input input-bordered w-full"
          onChange={changeCategoryName}
        />
      </div>

      <div className="modal-action flex flex-row w-full justify-around">
        <button
          className="btn btn-primary"
          onClick={() =>
            addCategory({ id: parseInt(getNewId()), name: categoryName })
          }
        >
          Add
        </button>

        <button className="btn btn-error" onClick={resetCategories}>
          Reset
        </button>

        <form method="dialog">
          <button className="btn btn-warning">Cancel</button>
          {/* if there is a button in form, it will close the modal */}
        </form>
      </div>
    </div>
  );
}
