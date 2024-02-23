import { UserModal, AddPDFModal } from "@/components/modals";

export function SiteHeader() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <h1 className="font-bold text-5xl text-center text-base-content">
        Papers
      </h1>

      <div className="join items-center">
        <a href="https://github.com/HassanJbara/papers">
          <button className="btn lg:btn-md btn-sm btn-ghost">
            <img
              alt="Github Logo"
              src="/icons/github.svg"
              className="w-12 h-12 fill-base-content"
            />
          </button>
        </a>

        <a href="https://xela.blog/">
          <button className="btn lg:btn-md btn-sm btn-ghost">
            <img
              alt="Xela Logo"
              src="/xela-logo.png"
              className="lg:w-12 lg:h-12 h-10 w-12 fill-base-content"
            />
          </button>
        </a>

        <AddPDFModal id="add_pdf_modal" />

        <UserModal id="login_modal" />
      </div>
    </div>
  );
}
