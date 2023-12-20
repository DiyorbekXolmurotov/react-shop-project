import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Authenticated from "./components/auth/Authenticated";
import UnAuthorizedApp from "./components/auth/UnAuthenticated";

function App() {
  const { auth } = useContext(AuthContext);
  return auth?.access_token ? <Authenticated /> : <UnAuthorizedApp />;
}

export default App;