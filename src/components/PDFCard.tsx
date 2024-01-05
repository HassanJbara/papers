import { getNewId, getTagColor } from "@/utils";
import type { Paper } from "@/types";
import { EditPDFModal } from "@/components";

import { Link } from "wouter";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";

interface Props {
  paper: Paper;
}

export function PDFCard(props: Props) {
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const [tooltipStyle, setTooltipStyle] = useState("tooltip-primary");

  function copyToClipboard() {
    navigator.clipboard.writeText(props.paper.citation);
    setTooltipText("Copied!");
    setTooltipStyle("tooltip-success");
    setTimeout(() => setTooltipText("Copy to clipboard"), 5000);
    setTimeout(() => setTooltipStyle("tooltip-primary"), 5000);
  }

  useEffect(() => {
    console.log(props.paper.tags);
  }, [props.paper.tags]);

  return (
    <div className="card card-compact w-full bg-base-300 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="card-title flex flex-row w-full">
          <Link href={"/pdf/" + props.paper.id}>
            <a className="w-full flex flex-col">
              <h2 className="text-2xl self-center">{props.paper.title}</h2>
            </a>
          </Link>
        </div>

        {props.paper.description && (
          <p className="capitalize w-full text-left text-lg my-4">
            {props.paper.description}
          </p>
        )}

        <div className="card-actions items-center flex flex-col lg:flex-row mt-4">
          {props.paper.tags?.map((tag) => (
            <div
              className={
                "p-2 badge badge-lg badge-outline badge-" + getTagColor()
              }
              key={tag.id}
            >
              {tag.name}
            </div>
          ))}

          <div className="divider lg:divider-horizontal" />

          <div className="lg:justify-end flex flex-row gap-2 z-10">
            <a href={props.paper.link} target="_blank">
              <button className="btn btn-md btn-ghost z-50 text-xl">🔗</button>
            </a>

            {props.paper.githubLink ? (
              <a
                title="GitHub Link"
                href={props.paper.githubLink}
                target="_blank"
              >
                <button
                  title="GitHub Link"
                  className="btn btn-md btn-ghost z-50"
                >
                  <ReactSVG
                    src="/icons/github.svg"
                    className="w-8 h-8 fill-current"
                  />
                </button>
              </a>
            ) : null}

            {props.paper.citation ? (
              <div className={"tooltip " + tooltipStyle} data-tip={tooltipText}>
                <button
                  title="Citation"
                  className="btn btn-md btn-ghost z-50"
                  onClick={copyToClipboard}
                >
                  <ReactSVG
                    src="/icons/book-bookmark.svg"
                    className="w-6 h-6 fill-current"
                  />
                </button>
              </div>
            ) : null}

            <EditPDFModal paper={props.paper} id={"modal_" + getNewId()} />
          </div>
        </div>
      </div>
    </div>
  );
}
