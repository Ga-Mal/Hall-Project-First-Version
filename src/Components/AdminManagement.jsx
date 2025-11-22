
import { Outlet } from "react-router";
import SidebarToAdmin from "./SidebarToAdmin";

export default function AdminManagement() {
  return (
    <div className="mt-20 flex">
      <SidebarToAdmin />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
