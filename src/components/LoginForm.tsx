import { useUserStore } from "@/stores";
import { useState } from "react";
import { ReactSVG } from "react-svg";

interface Props {
  closeModal: () => void;
}

export function LoginForm(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, resetMessage, errorMessage, user } = useUserStore();

  function resetErrors() {
    setEmptyUsername(false);
    setEmptyPassword(false);
    setInvalidCredentials(false);
    resetMessage();
  }

  function clearFields() {
    setUsername("");
    setPassword("");
  }

  function resetModal() {
    resetErrors();
    clearFields();
    setLoading(false);
  }

  function validateFields() {
    // check if a necessary field is empty
    if (!username) {
      setEmptyUsername(true);
      return false;
    }

    if (!password) {
      setEmptyPassword(true);
      return false;
    }

    return true;
  }

  async function submitModal() {
    resetErrors();

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    await login({ username: username, password: password })
      .then(() => {
        if (user) {
          props.closeModal();
        }
      })
      .catch(() => {
        setInvalidCredentials(true);
        setLoading(false);
      });
  }

  function closeModal() {
    resetModal();
    props.closeModal();
  }

  function cancel() {
    closeModal();
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <input
          id="username"
          type="text"
          className={`input input-bordered ${
            emptyUsername || invalidCredentials ? "input-error" : ""
          }`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className={`input input-bordered ${
            emptyPassword || invalidCredentials ? "input-error" : ""
          }`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-row items-center gap-2">
          <input
            id="show_password"
            type="checkbox"
            className="checkbox checkbox-accent"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />

          <label htmlFor="show_password">Show Password</label>
        </div>
      </div>

      {errorMessage ? (
        <div role="alert" className="alert alert-error mt-4">
          <ReactSVG src="/icons/error.svg" className="h-5 w-5 fill-current" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <div className="modal-action flex flex-row w-full justify-around">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={async () => await submitModal()}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Close
        </button>
      </div>
    </>
  );
}
