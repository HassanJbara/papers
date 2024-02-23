import { useUserStore } from "@/stores";
import { useState } from "react";
import { ReactSVG } from "react-svg";

interface Props {
  closeModal: () => void;
}

export function RegisterForm(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [emptyRepeatPassword, setEmptyRepeatPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register } = useUserStore();

  function resetErrors() {
    setEmptyUsername(false);
    setEmptyPassword(false);
    setEmptyRepeatPassword(false);
    setPasswordsDontMatch(false);
  }

  function clearFields() {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
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

    if (!repeatPassword) {
      setErrorMessage("Please repeat your password.");
      setEmptyRepeatPassword(true);
      return false;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords don't match.");
      setPasswordsDontMatch(true);
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

    await register({ username: username, password: password })
      .then(() => {
        setSuccess(true);
        resetModal();
      })
      .catch((error) => {
        setErrorMessage(error);
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
            emptyUsername ? "input-error" : ""
          }`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className={`input input-bordered ${
            emptyPassword || passwordsDontMatch ? "input-error" : ""
          }`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          id="repeat_password"
          type={showPassword ? "text" : "password"}
          className={`input input-bordered ${
            emptyRepeatPassword || passwordsDontMatch ? "input-error" : ""
          }`}
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
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
        <div role="alert" className="alert alert-error mt-4">
          <ReactSVG src="/icons/error.svg" className="h-5 w-5 fill-current" />
          <span className="font-semibold">{errorMessage}</span>
        </div>
      )}

      {success && (
        <div role="alert" className="alert alert-success mt-4">
          <ReactSVG src="/icons/check.svg" className="h-5 w-5 fill-current" />
          <span className="font-semibold">Registration successful!</span>
        </div>
      )}

      <div className="modal-action flex flex-row w-full justify-around">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={async () => await submitModal()}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <button className="btn btn-warning" onClick={cancel}>
          Close
        </button>
      </div>
    </>
  );
}
