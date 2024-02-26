import type { User } from "@/types";

interface Props {
  cancel: () => void;
  add: () => void;
  refresh: () => void;
  loading: boolean;
  user: Omit<User, "password"> | null;
}

export function AddModalButtons(props: Props) {
  return (
    <div className="modal-action flex flex-row w-full justify-around">
      <button className="btn btn-primary" onClick={props.add}>
        Add
      </button>

      <button
        className="btn btn-success mx-2"
        onClick={async () => await props.refresh()}
        disabled={props.loading || props.user === null}
      >
        {props.loading ? "Loading..." : "Refresh"}
      </button>

      <button className="btn btn-warning" onClick={props.cancel}>
        Cancel
      </button>
    </div>
  );
}
