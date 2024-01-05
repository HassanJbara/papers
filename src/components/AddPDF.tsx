import { useState } from "react";

import { usePDFStore } from "@/stores";

interface Props {
  closeModal: () => void;
}

export function AddPDF(props: Props) {
  const { tags, categories, addPaper, fillPapers } = usePDFStore(
    (state) => state
  );
  const [title, setTitle] = useState("");
  const [pdfLink, setPDFLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [citation, setCitation] = useState("");
  const [tagId, setTagId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState(-1);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyPDFLink, setEmptyPDFLink] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState(false);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyTitle(false);
    setTitle(e.target.value);
  };

  const changePDFLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyPDFLink(false);
    setPDFLink(e.target.value);
  };

  const changeCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmptyCategory(false);
    setCategoryId(parseInt(e.target.value));
  };

  function validateFields() {
    // check if a necessary field is empty

    if (!title) {
      setEmptyTitle(true);
      return false;
    }

    if (!pdfLink) {
      setEmptyPDFLink(true);
      return false;
    }

    if (categoryId === -1) {
      setEmptyCategory(true);
      return false;
    }

    return true;
  }

  function clearFields() {
    setTitle("");
    setPDFLink("");
    setGithubLink("");
    setDescription("");
    setTagId(null);
    setCategoryId(-1);
  }

  function add() {
    if (!validateFields()) {
      return;
    }

    addPaper(
      {
        title: title,
        link: pdfLink,
        category_id: categoryId,
        githubLink: githubLink,
        description: description,
        citation: citation,
      },
      tagId ? [tagId] : []
    );

    clearFields();

    props.closeModal();
  }

  function cancel() {
    clearFields();

    props.closeModal();
  }

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="PDF Title"
          className={
            "input input-bordered w-full " + (emptyTitle ? "input-error" : "")
          }
          value={title}
          onChange={changeTitle}
        />

        <input
          type="url"
          placeholder="PDF Link"
          className={
            "input input-bordered w-full " + (emptyPDFLink ? "input-error" : "")
          }
          value={pdfLink}
          onChange={changePDFLink}
        />

        <div className="divider" />

        <input
          type="text"
          placeholder="Github Link (optional)"
          className="input input-bordered w-full"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered textarea-lg w-full"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Citation (optional)"
          className="textarea textarea-bordered textarea-lg w-full"
          value={citation}
          onChange={(e) => setCitation(e.target.value)}
        />

        <div className="divider" />

        <select
          title="Pick a Category"
          className={
            "select select-bordered w-full " +
            (emptyCategory ? "select-error" : "")
          }
          onChange={changeCategoryId}
          value={categoryId}
        >
          <option disabled value={-1}>
            Pick a Category
          </option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          title="Pick Tags"
          className="select select-bordered w-full"
          onChange={(e) => setTagId(parseInt(e.target.value))}
          value={tagId || -1}
        >
          <option disabled value={-1}>
            Pick Tags
          </option>

          {tags.map((tag) => (
            <option value={tag.id} key={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-action flex flex-row w-full justify-around">
        <button className="btn btn-primary" onClick={add}>
          Add
        </button>

        <button className="btn btn-success mx-2" onClick={fillPapers}>
          Refresh
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
