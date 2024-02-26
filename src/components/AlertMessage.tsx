import { ReactSVG } from "react-svg";

interface Props {
  errorMessage: string;
  type: "error" | "success" | "info";
  closeAlert?: () => void;
}

export function AlertMessage(props: Props) {
  function getAlertType() {
    switch (props.type) {
      case "error":
        return "alert-error";
      case "success":
        return "alert-success";
      case "info":
        return "alert-info";
      default:
        return "";
    }
  }

  function getIcon() {
    switch (props.type) {
      case "error":
        return "/icons/error.svg";
      case "success":
        return "/icons/check.svg";
      case "info":
        return "/icons/info.svg";
      default:
        return "";
    }
  }

  return (
    <div role="alert" className={"alert mt-4 " + getAlertType()}>
      <ReactSVG src={getIcon()} className="h-5 w-5 fill-current" />

      <span>{props.errorMessage}</span>

      <button
        className="btn btn-sm btn-ghost btn-circle"
        onClick={props.closeAlert}
      >
        <ReactSVG src="/icons/x.svg" className="w-3 h-3 fill-current" />
      </button>
    </div>
  );
}
