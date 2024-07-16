import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import DashBoard from "./components/DashBoard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
