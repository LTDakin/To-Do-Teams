import { Navigate } from "react-router";
import Cookies from "js-cookie";

export function ProtectedRoute({ children }) {
  const accessToken = Cookies.get("access_token");
  // Check for a non-empty accessToken
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
}
