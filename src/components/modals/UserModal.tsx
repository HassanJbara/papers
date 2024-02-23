import { useUserStore } from "@/stores";
import { LoginForm, LogoutForm } from "@/components/modals";

import { ReactSVG } from "react-svg";
import { useRef, useState } from "react";
import { RegisterForm } from "./RegisterForm";

interface Props {
  id: string;
}

export function UserModal(props: Props) {
  const [activeTab, setActiveTab] = useState(0);

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
          {user !== null ? (
            <LogoutForm closeModal={() => modal.current?.close()} />
          ) : (
            <>
              <div role="tablist" className="tabs tabs-boxed tabs-lg mb-4">
                <a
                  role="tab"
                  className={"tab " + (activeTab === 0 ? "tab-active" : "")}
                  onClick={() => setActiveTab(0)}
                >
                  <span className="font-bold">Login</span>
                </a>

                <a
                  role="tab"
                  className={"tab " + (activeTab === 1 ? "tab-active" : "")}
                  onClick={() => setActiveTab(1)}
                >
                  <span className="font-bold">Register</span>
                </a>
              </div>

              {activeTab === 0 && (
                <LoginForm closeModal={() => modal.current?.close()} />
              )}

              {activeTab === 1 && (
                <RegisterForm closeModal={() => modal.current?.close()} />
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
