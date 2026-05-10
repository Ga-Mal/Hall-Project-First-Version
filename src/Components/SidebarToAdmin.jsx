import { Link, useLocation } from "react-router-dom";

export default function SidebarToAdmin() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "bg-(--color-hover) text-white" : "text-gray-100 hover:bg-gray-500";

  return (
    <div className="w-64 font-bold p-3 pb-10 text-[20px] bg-[#0000007b]/70 backdrop-blur-xl rounded-xl shadow-lg h-fit">
      <h2 className="text-xl font-bold mb-6 text-gray-100 border-b pb-2">
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

        <Link
          to="/management/allorders"
          className={`block px-4 py-2 rounded-lg font-medium transition ${isActive(
            "/management/allorders"
          )}`}>
          عرض الطلبات
        </Link>
      </nav>
    </div>
  );
}
