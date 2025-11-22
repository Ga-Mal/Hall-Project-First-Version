import { Navigate } from "react-router";
import { getUserSession } from "./getUserSession";

export default function GuestRoute({ children }) {
  const user = getUserSession();
  if (user) return <Navigate to="/home" replace />;
  return children;
}
