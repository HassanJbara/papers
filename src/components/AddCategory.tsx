import { useState } from "react";

import { usePDFStore } from "@/stores";
import { getNewId } from "@/utils";
import { ReactSVG } from "react-svg";

export function AddCategory() {
  const { addCategory, resetCategories, categories, removeCategory } =
    usePDFStore((state) => state);
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

        <div className="mt-4 mb-2 text-xl font-bold text-base-content">
          Current Categories:
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              className="flex flex-row gap-2 bg-info w-fit h-fit py-1 pr-3 items-center rounded-full"
              key={category.id}
            >
              <button
                className="btn btn-info btn-sm self-start btn-circle"
                onClick={() => removeCategory(category.id)}
              >
                <ReactSVG
                  src="/icons/x.svg"
                  className="w-4 h-4 text-info-content fill-current"
                />
              </button>

              <span className="text-info-content font-semibold">
                {category.name}
              </span>
            </div>
          ))}
        </div>
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
