import { useUserStore } from "@/stores";
import { LoginForm, LogoutForm } from "@/components";

import { ReactSVG } from "react-svg";
import { useRef } from "react";

interface Props {
  id: string;
}

export function LoginModal(props: Props) {
  const { user } = useUserStore((state) => state);

  const modal = useRef<HTMLDialogElement | null>(null);

  function openModal() {
    // resetModal();
    modal.current?.showModal();
  }

  return (
    <>
      <div className="indicator">
        {user === null ? (
          <span className="indicator-item badge badge-error badge-xs" />
        ) : null}
        <button
          className="btn lg:btn-md btn-sm btn-ghost"
          onClick={() => openModal()}
        >
          <ReactSVG src="/icons/user.svg" className="h-5 w-5 fill-current" />
        </button>
      </div>

      <dialog ref={modal} id={props.id} className="modal">
        <div className="modal-box flex flex-col">
          <h2 className="font-bold text-2xl text-center">Login</h2>

          {user !== null ? (
            <LogoutForm closeModal={() => modal.current?.close()} />
          ) : (
            <LoginForm closeModal={() => modal.current?.close()} />
          )}
        </div>
      </dialog>
    </>
  );
}
