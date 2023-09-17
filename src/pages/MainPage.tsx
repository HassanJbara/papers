import { PDFCard } from "@/components";
import { categories } from "@/types";
import { PAPERS } from "@/papers";

export function MainPage() {
  return (
    <body className="p-10">
      <main className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-4">
          <h1 className="w-full font-bold text-5xl text-center text-base-content">
            Papers
          </h1>

          <div className="join">
            <a
              href="https://github.com/HassanJbara/papers"
              className="join-item"
            >
              <button className="btn btn-md btn-ghost z-50">
                <img
                  alt="Github Logo"
                  src="/icons/github.svg"
                  className="w-24 h-12 fill-base-content"
                />
              </button>
            </a>

            <a href="https://xela.blog/" className="join-item">
              <button className="btn btn-md btn-ghost z-50 text-xl">
                <img
                  alt="Xela Logo"
                  src="/xela-logo.png"
                  className="w-24 h-12 fill-base-content"
                />
              </button>
            </a>
          </div>
        </div>

        <p className="md:w-1/2 my-10 text-2xl font-semibold text-base-content">
          A simple reader with a collection of Computer Science papers that I
          found particularly interesting, with links to github, source and
          sometimes my notes.
        </p>

        {categories.map((category) => (
          <div className="my-6 md:w-1/2 flex flex-col gap-4">
            <h2 className="font-semibold text-4xl text-base-content">
              {category}
            </h2>

            {PAPERS.filter((paper) => paper.category === category).map(
              (paper) => (
                <PDFCard paper={paper} />
              )
            )}
          </div>
        ))}
      </main>
    </body>
  );
}
