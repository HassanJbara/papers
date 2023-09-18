import { useState } from "react";

import { usePDFStore } from "@/stores";
import { getNewId } from "@/utils";

interface Props {
  closeModal: () => void;
}

export function AddPDF(props: Props) {
  const { tags, categories, addPaper, resetPapers } = usePDFStore(
    (state) => state
  );
  const [title, setTitle] = useState("");
  const [pdfLink, setPDFLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [tagId, setTagId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState(-1);

  function clearFields() {
    console.log("clearing fields");
    setTitle("");
    setPDFLink("");
    setGithubLink("");
    setDescription("");
    setTagId(null);
    setCategoryId(-1);
  }

  function add() {
    addPaper({
      id: parseInt(getNewId()),
      title: title,
      category: categories.find((c) => c.id === categoryId)!,
      paperLink: pdfLink,
      githubLink: githubLink,
      description: description,
      tags: tagId ? [tags.find((t) => t.id === tagId)!] : [],
    });

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
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="PDF Link"
          className="input input-bordered w-full"
          value={pdfLink}
          onChange={(e) => setPDFLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github Link (optional)"
          className="input input-bordered w-full"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          title="Pick a Category"
          className="select select-bordered w-full"
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
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

        <button className="btn btn-error mx-2" onClick={resetPapers}>
          Reset
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
