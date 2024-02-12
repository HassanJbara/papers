import { useUserStore } from "@/stores";

interface Props {
  closeModal: () => void;
}

export function LogoutForm(props: Props) {
  const { user, resetUser } = useUserStore();

  return (
    <>
      <span className="mt-6 text-lg">
        You are already logged in as <strong>{user?.username}</strong>.
      </span>

      <div className="modal-action flex flex-row w-full justify-around">
        <button className="btn btn-error" onClick={resetUser}>
          Logout
        </button>

        <button className="btn btn-warning" onClick={props.closeModal}>
          Close
        </button>
      </div>
    </>
  );
}
