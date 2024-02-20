import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import { useCategoriesStore, useUserStore } from "@/stores";
import { AddModalButtons } from "@/components";

interface Props {
  closeModal: () => void;
}

export function AddCategory(props: Props) {
  const {
    addCategory,
    addCategoryOffline,
    fillCategories,
    categories,
    removeCategory,
    removeCategoryOffline,
  } = useCategoriesStore((state) => state);
  const { user } = useUserStore((state) => state);
  const [categoryName, setCategoryName] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!user) {
      addCategoryOffline({ name: categoryName });
    } else {
      addCategory({ name: categoryName, user_id: user?.id });
    }

    clearFields();
  }

  function remove(categoryId: number) {
    if (!user) {
      removeCategoryOffline(categoryId);
    } else {
      removeCategory(categoryId);
    }
  }

  async function refresh() {
    setLoading(true);
    await fillCategories()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    if (user) {
      fillCategories();
    }
  }, [user, fillCategories]);

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
                onClick={() => remove(category.id)}
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

      <AddModalButtons
        cancel={cancel}
        add={add}
        refresh={refresh}
        loading={loading}
        user={user}
      />
    </div>
  );
}
