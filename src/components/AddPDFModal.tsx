import { useEffect, useRef } from "react";

interface Props {
  id: string;
}

export function AddPDFModal(props: Props) {
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
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a New PDF</h3>

          <p className="py-4">
            Press ESC key or click the button below to close
          </p>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
