import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";

import type { Paper } from "@/types";
import { usePDFStore } from "@/stores";

interface Props {
  id: string;
  paper: Paper;
}

export function EditPDFModal(props: Props) {
  const [title, setTitle] = useState(props.paper.title);
  const [categoryId, setCategoryId] = useState(props.paper.category.id);
  const [pdfLink, setPDFLink] = useState(props.paper.paperLink);
  const [githubLink, setGithubLink] = useState(props.paper.githubLink);
  const [citation, setCitation] = useState(props.paper.citation);
  const [description, setDescription] = useState(props.paper.description);
  const [tagId, setTagId] = useState(props.paper.tags[0]?.id);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyPDFLink, setEmptyPDFLink] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState(false);

  const { categories, tags, updatePaper, removePaper } = usePDFStore(
    (state) => state
  );

  const modal = useRef<HTMLDialogElement | null>(null);

  function openModal() {
    modal.current?.showModal();
  }

  function closeModal() {
    modal.current?.close();
  }

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

  function submitModal() {
    if (!validateFields()) {
      return;
    }

    updatePaper({
      id: props.paper.id,
      title: title,
      category: categories.find((c) => c.id === categoryId)!,
      paperLink: pdfLink,
      githubLink: githubLink,
      citation: citation,
      description: description,
      tags: tagId ? [tags.find((t) => t.id === tagId)!] : [],
    });

    closeModal();
  }

  function cancel() {
    // reset all the fields
    setTitle(props.paper.title);
    setCategoryId(props.paper.category.id);
    setPDFLink(props.paper.paperLink);
    setGithubLink(props.paper.githubLink);
    setCitation(props.paper.citation);
    setDescription(props.paper.description);
    setTagId(props.paper.tags[0]?.id);

    closeModal();
  }

  function remove() {
    removePaper(props.paper.id);
    closeModal();
  }

  useEffect(() => {
    modal.current = modal.current = document.querySelector(
      "#" + props.id
    ) as HTMLDialogElement;
  });

  return (
    <>
      <button
        title="Edit PDF"
        className="btn btn-primary btn-md"
        onClick={openModal}
      >
        <ReactSVG
          src="/icons/pen.svg"
          className="w-5 h-5 text-primary-content fill-current"
        />
      </button>

      <dialog id={props.id} className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="text-2xl font-bold">Edit PDF</h3>

          <div className="mt-2">
            <div className="w-full flex flex-col gap-4 py-8">
              <input
                type="text"
                placeholder="PDF Title"
                className={
                  "input input-bordered w-full " +
                  (emptyTitle ? "input-error" : "")
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="PDF Link"
                className={
                  "input input-bordered w-full " +
                  (emptyPDFLink ? "input-error" : "")
                }
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
                placeholder="Citation (optional)"
                className="textarea textarea-bordered textarea-lg w-full"
                value={citation}
                onChange={(e) => setCitation(e.target.value)}
              />

              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
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
                className={
                  "select select-bordered w-full " +
                  (emptyCategory ? "select-error" : "")
                }
                value={tagId}
                onChange={(e) => setTagId(parseInt(e.target.value))}
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
              <button className="btn btn-primary" onClick={submitModal}>
                Submit
              </button>

              <button className="btn btn-error" onClick={remove}>
                Remove
              </button>

              <button className="btn btn-warning" onClick={cancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
