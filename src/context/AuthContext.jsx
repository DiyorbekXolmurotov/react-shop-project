import { createContext, useState } from "react";

const initialContext = {
  access_token: null,
  refresh_token: null,
};

function getAuthFromStorage() {
  try {
    const auth = JSON.parse(sessionStorage.getItem("auth"));

    return auth || initialContext;
  } catch (error) {
    return initialContext;
  }
}

export const AuthContext = createContext(getAuthFromStorage());

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getAuthFromStorage());

  function logOut() {
    setAuth(initialContext);
    sessionStorage.removeItem("auth");
  }

  function logIn(data) {
    setAuth(data);
    sessionStorage.setItem("auth", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{ auth, logOut, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}