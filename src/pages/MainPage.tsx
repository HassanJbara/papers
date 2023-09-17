import { SiteHeader, PDFCard } from "@/components";
import { categories } from "@/types";
import { PAPERS } from "@/papers";

export function MainPage() {
  return (
    <div className="flex flex-col items-center p-10">
      <SiteHeader />

      <p className="md:w-1/2 my-10 text-2xl font-semibold text-base-content">
        A simple reader with a collection of Computer Science papers that I
        found particularly interesting, with links to github, source and
        sometimes my notes.
      </p>

      {categories.map((category) => (
        <div className="my-6 md:w-1/2 flex flex-col gap-4" key={category}>
          <h2 className="font-semibold text-4xl text-base-content">
            {category}
          </h2>

          {PAPERS.filter((paper) => paper.category === category).map(
            (paper) => (
              <PDFCard paper={paper} key={paper.id} />
            )
          )}
        </div>
      ))}
    </div>
  );
}
