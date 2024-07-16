import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <NavBar onClick={handleSignOut} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
