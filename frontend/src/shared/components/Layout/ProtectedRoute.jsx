import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authContext = useContext(AuthContext);

  if (!authContext.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
