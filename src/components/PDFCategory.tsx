import type { Category, Paper } from "@/types";
import { PDFCard } from "@/components";

interface Props {
  category?: Category;
  papers: Paper[];
}

export function PDFCategory(props: Props) {
  return (
    <div className="my-2 md:w-1/2 gap-4 collapse collapse-arrow">
      <input type="checkbox" defaultChecked />

      <h2 className="font-semibold text-4xl text-base-content collapse-title">
        {props.category?.name || "Uncategorized"}
      </h2>

      <div className="collapse-content flex flex-col gap-4">
        {props.papers.map((paper) => (
          <PDFCard paper={paper} key={paper.id} />
        ))}
      </div>
    </div>
  );
}
