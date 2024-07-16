import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto">Loading...</span>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;

};

export default ProtectedRoute;
