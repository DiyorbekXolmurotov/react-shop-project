import { Outlet } from "react-router-dom";
function Authenticated() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Authenticated;