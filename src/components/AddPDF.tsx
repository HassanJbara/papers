import { useState } from "react";

import {
  useCategoriesStore,
  usePDFStore,
  useTagsStore,
  useUserStore,
} from "@/stores";
import { AddModalButtons } from "@/components";

interface Props {
  closeModal: () => void;
}

export function AddPDF(props: Props) {
  const { addPaper, addPaperOffline, fillPapers } = usePDFStore(
    (state) => state
  );
  const { tags } = useTagsStore((state) => state);
  const { categories } = useCategoriesStore((state) => state);
  const { user } = useUserStore((state) => state);

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
  const [loading, setLoading] = useState(false);

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

    if (!user) {
      addPaperOffline({
        title,
        link: pdfLink,
        citation: citation,
        tags: tags.filter((tag) => tag.id === tagId),
        category:
          categories.find((category) => category.id === categoryId) || null,
      });
    } else {
      addPaper({
        title: title,
        link: pdfLink,
        category_id: categoryId,
        githubLink: githubLink,
        description: description,
        citation: citation,
        tags: tagId ? [tagId] : [],
        user_id: user.id,
      });
    }

    clearFields();
    props.closeModal();
  }

  function cancel() {
    clearFields();

    props.closeModal();
  }

  async function refresh() {
    setLoading(true);
    await fillPapers()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
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
