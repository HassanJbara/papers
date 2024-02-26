import { UserModal, AddPDFModal } from "@/components/modals";
import { ReactSVG } from "react-svg";

export function SiteHeader() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <h1 className="font-bold text-5xl text-center text-base-content">
        Papers
      </h1>

      <AddPDFModal id="add_pdf_modal" />

      <UserModal id="login_modal" />

      <div className="join items-center">
        <a href="https://github.com/HassanJbara/papers" target="_blank">
          <button className="btn lg:btn-md btn-sm btn-ghost">
            <ReactSVG
              src="/icons/github.svg"
              className="w-9 h-9 fill-base-content"
            />
          </button>
        </a>

        <a href="https://xela.blog/" target="_blank">
          <button className="btn lg:btn-md btn-sm btn-ghost">
            <img
              alt="Xela Logo"
              src="/xela-logo.png"
              className="lg:w-10 lg:h-10 h-10 w-12"
            />
          </button>
        </a>
      </div>
    </div>
  );
}
