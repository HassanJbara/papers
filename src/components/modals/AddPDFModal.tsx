import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";

import { AddCategory, AddPDF, AddTag } from "@/components/modals";

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
      <button className="btn lg:btn-md btn-sm btn-ghost" onClick={openModal}>
        <ReactSVG
          src="/icons/plus.svg"
          className="lg:w-10 lg:h-10 w-9 h-9 fill-base-content"
        />
      </button>

      <dialog id={props.id} className="modal">
        <div className="modal-box flex flex-col">
          <div className="tabs tabs-boxed w-fit self-center">
            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 0 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(0)}
            >
              <ReactSVG src="/icons/pdf.svg" className="h-6 w-6 fill-current" />
            </a>

            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 1 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(1)}
            >
              <ReactSVG
                src="/icons/folder.svg"
                className="h-6 w-6 fill-current"
              />
            </a>

            <a
              className={
                "text-xl tab tab-lg " + (activeTab === 2 ? "tab-active" : "")
              }
              onClick={() => setActiveTab(2)}
            >
              <ReactSVG src="/icons/tag.svg" className="h-6 w-6 fill-current" />
            </a>
          </div>

          {activeTab === 0 && (
            <AddPDF closeModal={() => modal.current?.close()} />
          )}
          {activeTab === 1 && (
            <AddCategory closeModal={() => modal.current?.close()} />
          )}
          {activeTab === 2 && (
            <AddTag closeModal={() => modal.current?.close()} />
          )}
        </div>
      </dialog>
    </>
  );
}
