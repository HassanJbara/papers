import { useState } from "react";
import { ReactSVG } from "react-svg";

import { usePDFStore } from "@/stores";
import { getNewId } from "@/utils";

interface Props {
  closeModal: () => void;
}

export function AddCategory(props: Props) {
  const { addCategory, resetCategories, categories, removeCategory } =
    usePDFStore((state) => state);
  const [categoryName, setCategoryName] = useState("");
  const [showError, setShowError] = useState(false);
  const changeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setCategoryName(e.target.value);
  };

  function clearFields() {
    setCategoryName("");
  }

  function cancel() {
    clearFields();
    props.closeModal();
  }

  function add() {
    // check if category name is empty
    if (!categoryName) {
      setShowError(true);
      return;
    }

    addCategory({ id: parseInt(getNewId()), name: categoryName });

    clearFields();
  }

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="Category Name"
          className={
            "input input-bordered w-full " + (showError ? "input-error" : "")
          }
          value={categoryName}
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
                title="Remove Category"
                className="btn btn-info btn-sm self-start btn-circle"
                onClick={() => removeCategory(category.id)}
              >
                <ReactSVG
                  src="/icons/xmark.svg"
                  className="w-4 h-4 fill-current mb-0.5"
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
        <button className="btn btn-primary" onClick={add}>
          Add
        </button>

        <button className="btn btn-error" onClick={resetCategories}>
          Reset
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
