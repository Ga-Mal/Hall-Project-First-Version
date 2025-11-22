import { Navigate } from "react-router-dom";
import { getUserSession } from "./getUserSession";

export default function AdminRoute({ children }) {
  const user = getUserSession();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
}
