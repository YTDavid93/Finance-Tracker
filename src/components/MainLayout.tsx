import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar>
        <h1>Financely</h1>
      </NavBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
