import type { Paper } from "@/types";
import { getTagColor } from "@/utils";

interface Props {
  paper: Paper;
}

export function PDFCard(props: Props) {
  return (
    <div className="card card-compact w-full bg-base-300 text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl w-fit">{props.paper.title}</h2>

        {/* <p className="capitalize">{{ paper.description }}</p> */}

        <div className="card-actions justify-end items-center flex flex-row mt-4">
          {props.paper.tags.map((tag) => (
            <div
              className={"badge badge-lg badge-outline p-2 " + getTagColor(tag)}
            >
              {tag}
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
                href={props.paper.githubLink}
                className="join-item"
                target="_blank"
              >
                <button className="btn btn-md btn-ghost z-50">
                  <img
                    alt="Github Logo"
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
