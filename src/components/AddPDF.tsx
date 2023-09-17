import { useState } from "react";

import { usePDFStore } from "@/stores";
import { getNewId } from "@/utils";

export function AddPDF() {
  const { tags, categories, addPaper, resetState } = usePDFStore(
    (state) => state
  );
  const [title, setTitle] = useState("");
  const [pdfLink, setPDFLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [tagId, setTagId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState(0);

  return (
    <div className="mt-2">
      <div className="w-full flex flex-col gap-4 py-8">
        <input
          type="text"
          placeholder="PDF Title"
          className="input input-bordered w-full"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="PDF Link"
          className="input input-bordered w-full"
          onChange={(e) => setPDFLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github Link (optional)"
          className="input input-bordered w-full"
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description (optional)"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
        >
          <option disabled selected>
            Pick a Category
          </option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          onChange={(e) => setTagId(parseInt(e.target.value))}
        >
          <option disabled selected>
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
        <button
          className="btn btn-primary"
          onClick={() =>
            addPaper({
              id: parseInt(getNewId()),
              title: title,
              category: categories.find((c) => c.id === categoryId)!,
              paperLink: pdfLink,
              githubLink: githubLink,
              description: description,
              tags: tagId ? [tags.find((t) => t.id === tagId)!] : [],
            })
          }
        >
          Add PDF
        </button>

        <form method="dialog">
          <button className="btn btn-warning">Cancel</button>

          <button className="btn btn-warning" onClick={resetState}>
            Remove All PDF Files
          </button>
          {/* if there is a button in form, it will close the modal */}
        </form>
      </div>
    </div>
  );
}
