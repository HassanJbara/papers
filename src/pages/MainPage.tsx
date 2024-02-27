import { SiteHeader, PDFCategory } from "@/components";
import {
  useCategoriesStore,
  useHighlightsStore,
  usePDFStore,
  useTagsStore,
  useUserStore,
} from "@/stores";

import { useEffect } from "react";
import { ReactSVG } from "react-svg";

export function MainPage() {
  const { papers, fillPapers } = usePDFStore((state) => state);
  const { categories, fillCategories } = useCategoriesStore((state) => state);
  const { user } = useUserStore((state) => state);
  const { fillHighlights } = useHighlightsStore((state) => state);

  function clearStorage() {
    usePDFStore.getState().resetState();
    useTagsStore.getState().resetState();
    useCategoriesStore.getState().resetState();
    useHighlightsStore.getState().resetState();

    usePDFStore.persist.clearStorage();
    useTagsStore.persist.clearStorage();
    useCategoriesStore.persist.clearStorage();
    useHighlightsStore.persist.clearStorage();
  }

  useEffect(() => {
    if (user) {
      fillCategories();
      fillPapers();
      fillHighlights();
    }
  }, [user, fillCategories, fillPapers, fillHighlights]);

  return (
    <div className="h-screen flex flex-col items-center p-10">
      <SiteHeader />

      {papers.length === 0 && (
        <div className="h-full w-full flex flex-col items-center gap-10 justify-center">
          <ReactSVG
            src="/icons/empty.svg"
            className="w-40 h-40 fill-base-content"
          />

          <span className="font-bold text-xl text-base-content">
            You have no PDFs at the moment. To add one, click the + button in
            the header.
          </span>
        </div>
      )}

      {categories.map(
        (category) =>
          papers.filter((p) => p.category?.id === category.id).length > 0 && (
            <PDFCategory
              category={category}
              papers={papers.filter(
                (paper) => paper.category?.id === category.id
              )}
              key={category.id}
            />
          )
      )}

      {/* add section for papers with category==null */}
      {papers.filter((p) => p.category == null).length > 0 && (
        <PDFCategory
          papers={papers.filter((paper) => paper.category == null)}
        />
      )}

      {papers.length > 0 && (
        <button
          className="btn btn-error btn-lg btn-outline"
          onClick={clearStorage}
        >
          <span className="font-semibold capitalize">clear local storage</span>
        </button>
      )}
    </div>
  );
}
