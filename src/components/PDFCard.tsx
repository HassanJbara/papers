import { usePDFStore } from "@/stores";
import type { Paper } from "@/types";
import { EditPDFModal } from "@/components";
import { getNewId } from "@/utils";

import { Link } from "wouter";
import { ReactSVG } from "react-svg";

interface Props {
  paper: Paper;
}

export function PDFCard(props: Props) {
  const { removePaper } = usePDFStore((state) => state);

  return (
    <div className="card card-compact w-full bg-base-300 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="card-title flex flex-row w-full">
          <Link href={"/pdf/" + props.paper.id}>
            <a className="w-full flex flex-col">
              <h2 className="text-2xl self-center">{props.paper.title}</h2>
            </a>
          </Link>

          <div className="card-actions self-end">
            <div className="flex flex-row gap-2">
              <EditPDFModal paper={props.paper} id={"modal_" + getNewId()} />

              <button
                title="Remove PDF"
                className="btn btn-error btn-sm"
                onClick={() => removePaper(props.paper.id)}
              >
                <ReactSVG
                  src="/icons/x.svg"
                  className="w-4 h-4 text-error-content fill-current"
                />
              </button>
            </div>
          </div>
        </div>

        {props.paper.description && (
          <p className="capitalize w-full text-left text-lg my-4">
            {props.paper.description}
          </p>
        )}

        <div className="card-actions justify-end items-center flex flex-row mt-4">
          {props.paper.tags.map((tag) => (
            <div
              className={"p-2 badge badge-lg badge-outline badge-" + tag.color}
              key={tag.id}
            >
              {tag.name}
            </div>
          ))}

          <div className="divider lg:divider-horizontal" />

          <div className="join z-10">
            <a
              href={props.paper.paperLink}
              className="join-item"
              target="_blank"
            >
              <button className="btn btn-md btn-ghost z-50 text-xl">🔗</button>
            </a>

            {props.paper.githubLink ? (
              <a
                title="GitHub Link"
                href={props.paper.githubLink}
                className="join-item"
                target="_blank"
              >
                <button
                  title="GitHub Link"
                  className="btn btn-md btn-ghost z-50"
                >
                  <ReactSVG
                    src="/icons/github.svg"
                    className="w-8 h-8 fill-base-content"
                  />
                </button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
