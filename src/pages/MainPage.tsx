import { SiteHeader, PDFCard } from "@/components";
import { usePDFStore } from "@/stores";

export function MainPage() {
  const { categories, papers } = usePDFStore((state) => state);

  return (
    <div className="flex flex-col items-center p-10">
      <SiteHeader />

      <p className="md:w-1/2 my-10 text-2xl font-semibold text-base-content">
        A simple and functional open-source PDF reader. For more information on
        the project, check out the GitHub repository.
      </p>

      {categories.map(
        (category) =>
          papers.filter((p) => p.category.id === category.id).length > 0 && (
            <div
              className="my-6 md:w-1/2 flex flex-col gap-4"
              key={category.id}
            >
              <h2 className="font-semibold text-4xl text-base-content">
                {category.name}
              </h2>

              {papers
                .filter((paper) => paper.category.id === category.id)
                .map((paper) => (
                  <PDFCard paper={paper} key={paper.id} />
                ))}
            </div>
          )
      )}
    </div>
  );
}
