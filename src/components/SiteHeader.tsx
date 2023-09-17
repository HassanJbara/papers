import { AddPDFModal } from "@/components";

export function SiteHeader() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <h1 className="font-bold text-5xl text-center text-base-content">
        Papers
      </h1>

      <div className="join">
        <a href="https://github.com/HassanJbara/papers">
          <button className="btn btn-md btn-ghost z-50">
            <img
              alt="Github Logo"
              src="/icons/github.svg"
              className="w-12 h-12 fill-base-content"
            />
          </button>
        </a>

        <a href="https://xela.blog/">
          <button className="btn btn-md btn-ghost z-50 text-xl">
            <img
              alt="Xela Logo"
              src="/xela-logo.png"
              className="w-12 h-12 fill-base-content"
            />
          </button>
        </a>

        <AddPDFModal id="add_pdf_modal" />
      </div>
    </div>
  );
}
