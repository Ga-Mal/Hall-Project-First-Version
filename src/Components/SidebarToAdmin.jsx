import { Link, useLocation } from "react-router-dom";

export default function SidebarToAdmin() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "bg-(--color-hover) text-white" : "text-gray-700 hover:bg-gray-300";

  return (
    <div
      className="w-64 font-bold p-3 text-[20px] nav backdrop-blur-xl rounded-xl shadow-lg h-[90vh]">
      <h2 className="text-xl font-bold mb-6 text-(--color-text-black) border-b pb-2">
        لوحة التحكم
      </h2>

      <nav className="space-y-3">
        <Link
          to="/management/addHall"
          className={`block px-4 py-2 rounded-lg font-medium transition ${isActive(
            "/management/addHall"
          )}`}>
          إضافة قاعة
        </Link>

        <Link
          to="/management/addLocation"
          className={`block px-4 py-2 rounded-lg font-medium transition ${isActive(
            "/management/addLocation"
          )}`}>
          إضافة لوكيشن
        </Link>
      </nav>
    </div>
  );
}
