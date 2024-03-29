import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Link } from "wouter";

interface Props {
  title: string;
}

export function SidebarHeader(props: Props) {
  const [scale, setScale] = useState(1.25);

  useEffect(() => {
    if ((window as any).PdfViewer) {
      (window as any).PdfViewer.viewer.currentScaleValue = scale;
    }
  }, [scale]);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-center text-base-content max-w-md">
        {props.title}
      </h2>

      <div className="mb-4 p-4 flex lg:flex-row flex-col items-center w-full gap-2 justify-center">
        <Link to="/">
          <span className="text-2xl link link-hover"> ⏪ Home </span>
        </Link>

        <div className="divider lg:divider-horizontal" />

        <div className="flex flex-row gap-2 items-center">
          <button
            className="btn btn-primary btn-sm btn-circle"
            onClick={() => setScale(scale > 0.25 ? scale - 0.25 : 0.25)}
          >
            <ReactSVG
              src="/icons/minus.svg"
              className="w-7 h-7 fill-primary-content"
            />
          </button>

          <span className="py-0.5 px-1.5 border border-base-content rounded-xl text-lg">
            {scale * 100}%
          </span>

          <button
            className="btn btn-primary btn-sm btn-circle"
            onClick={() => setScale(scale + 0.25)}
          >
            <ReactSVG
              src="/icons/plus.svg"
              className="w-7 h-7 fill-primary-content"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
