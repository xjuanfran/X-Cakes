import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  //console.log(loading, isAuthenticated);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
