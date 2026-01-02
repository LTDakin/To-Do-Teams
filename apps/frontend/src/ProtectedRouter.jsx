import { useAtomValue } from "jotai";
import { userAtom } from "./state/user";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }) {
  const user = useAtomValue(userAtom);
  // Check for a non-empty accessToken
  if (!user.accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
}
