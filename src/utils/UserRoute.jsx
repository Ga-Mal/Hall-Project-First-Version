import { Navigate } from "react-router";
import { getUserSession } from "./getUserSession";

export default function UserRoute({ children }) {
  const user = getUserSession();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
