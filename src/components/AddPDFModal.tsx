import { useEffect, useRef, useState } from "react";
import { AddCategory, AddPDF, AddTag } from "@/components";

interface Props {
  id: string;
}

export function AddPDFModal(props: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const modal = useRef<HTMLDialogElement | null>(null);

  function openModal() {
    modal.current?.showModal();
  }

  useEffect(() => {
    modal.current = modal.current = document.querySelector(
      "#" + props.id
    ) as HTMLDialogElement;
  }, []);
  return (
    <>
      <button className="btn btn-md btn-ghost" onClick={openModal}>
        <img
          src="/icons/plus.svg"
          alt="plus"
          className="w-10 h-10 fill-base-content"
        />
      </button>

      <dialog id={props.id} className="modal">
        <div className="modal-box w-full flex flex-col">
          <div className="tabs tabs-boxed w-fit self-center">
            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 0 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(0)}
            >
              Add a PDF
            </a>

            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 1 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(1)}
            >
              Add a Category
            </a>

            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 2 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(2)}
            >
              Add a Tag
            </a>
          </div>

          {activeTab === 0 && <AddPDF />}
          {activeTab === 1 && <AddCategory />}
          {activeTab === 2 && <AddTag />}
        </div>
      </dialog>
    </>
  );
}
