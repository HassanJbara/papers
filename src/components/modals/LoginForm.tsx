import { useUserStore } from "@/stores";
import { AlertMessage } from "@/components";

import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, user } = useUserStore();

  function resetErrors() {
    setEmptyUsername(false);
    setEmptyPassword(false);
    setInvalidCredentials(false);
    setErrorMessage(null);
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
      setErrorMessage("Please enter a username.");
      setEmptyUsername(true);
      return false;
    }

    if (!password) {
      setErrorMessage("Please enter a password.");
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
      .catch((error) => {
        setErrorMessage(error);
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

      {errorMessage && (
        <AlertMessage
          errorMessage={errorMessage}
          type="error"
          closeAlert={() => setErrorMessage(null)}
        />
      )}

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
