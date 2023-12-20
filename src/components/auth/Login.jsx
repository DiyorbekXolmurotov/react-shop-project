import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import './Auth.scss'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logIn } = useContext(AuthContext);
  const ref = useRef(null);
  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(ref.current);
    setLoading(true);
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login/", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          logIn(data);
        } else {
          setError(new Error(data?.error || "Unexpected Error"));
        }
      })
      .catch((error) => setError(error?.response?.data?.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="container_small">
        <div className="auth">
          <h2 className="auth__heading">Login</h2>
          {error && <pre style={{marginBottom: 10}}>{error.toString()}</pre>}
          <form onSubmit={handleSubmit} ref={ref}>
            <input className="auth__input--email" type="email" name="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="on"
              className="auth__input--password"
            />
            <button className="auth__btn" type="submit">{loading ? "Loading..." : "Sign Up"}</button>
          </form>
        </div>
      </div>
    </>
  );
}