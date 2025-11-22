import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import logo from "../assets/imgs/icons-logos/logo.png";
import Button from "./Button";
import { HiMenu, HiX } from "react-icons/hi";
import { getUserSession } from "../utils/getUserSession";
import Swal from "sweetalert2";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  const currentUser = getUserSession();
  const firstName =
    currentUser && (currentUser.role === "admin" || currentUser.role === "user")
      ? currentUser.name.split(" ")[0]
      : "";
  const clearSession = () => {
    Swal.fire({
      title: "تسجيل الخروج",
      text: `اذيك يا ${firstName}, أنت فعلا عايز تخرج؟😢`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("session_token");
        Swal.fire({
          title: "تم تسجيل الخروج بنجاح ✅",
          text: "لقد تم تسجيل خروجك بنجاح. نأمل أن نراك مرة أخرى قريبًا!",
          icon: "success",
          confirmButtonText: "حسناً",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="fixed w-screen top-0 left-0 z-50">
      <div className="nav font-bold px-10 md:px-2 p-3 text-[20px] flex justify-between md:justify-evenly items-center backdrop-blur-lg shadow-lg">
        {/* Logo */}
        <div className="flex items-center md:mx-20">
          <Link to={"/"}>
            <img
              loading="lazy"
              src={logo}
              alt="logoImg"
              className="w-40 md:w-48"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-evenly w-full gap-12">
          <ul className="flex justify-around gap-x-9">
            {/* Link Component */}
            {[
              { name: "الصفحة الرئيسية", path: "/" },
              { name: "القاعات", path: "/halls" },
              { name: "لوكيشن تصوير", path: "/photography" },
              { name: "إدارة", path: "management", adminOnly: true },
            ]
              .filter(
                (link) => !link.adminOnly || currentUser?.role === "admin"
              )
              .map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`
                    ${
                      isActive(link.path)
                        ? "text-(--color-text-gold)"
                        : "text-(--color-text-light)"
                    }
                    relative transition 
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 
                    after:w-0 after:h-0.5 after:bg-(--color-text-gold) 
                    hover:after:w-full after:transition-all after:duration-300
                  `}>
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>

          <div>
            {currentUser ? (
              <span className="text-(--color-text-light)">
                أهلا , {firstName} 💜
                <button
                  className=" bg-(--color-hover) cursor-pointer px-5 py-1 rounded-2xl hover:bg-[#38084e] hover:text-(--color-text-light) duration-500 mx-5"
                  onClick={clearSession}>
                  خروج
                </button>
              </span>
            ) : (
              <Button text={"تسجيل الدخول"} url={"/login"} />
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {open ? (
            <HiX
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          ) : (
            <HiMenu
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          md:hidden bg-white/40 backdrop-blur-xl shadow-xl 
          transition-all duration-300 overflow-hidden
          ${open ? "max-h-96 py-4" : "max-h-0 py-0"}
        `}>
        <ul className="flex flex-col items-center gap-6 text-xl font-semibold">
          {[
            { name: "الصفحة الرئيسية", path: "/" },
            { name: "القاعات", path: "/halls" },
            { name: "لوكيشن تصوير", path: "/photography" },
            { name: "إدارة", path: "management", adminOnly: true },
          ]
            .filter((link) => !link.adminOnly || currentUser?.role === "admin")
            .map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`
                    ${
                      isActive(link.path)
                        ? "text-(--color-text-gold)"
                        : "text-(--color-text-light)"
                    }
                    relative transition 
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 
                    after:w-0 after:h-0.5 after:bg-(--color-text-gold) 
                    hover:after:w-full after:transition-all after:duration-300
                  `}>
                  {link.name}
                </Link>
              </li>
            ))}

          {/* <input
            type="text"
            placeholder="بحث"
            className="p-2 rounded-xl outline-none text-center w-3/4"
          /> */}
          {currentUser ? (
            <span className="text-(--color-text-light)">
              أهلا , {firstName} 💜
              <br />
              <button
                className="mt-5 bg-(--color-text-gold) cursor-pointer px-10 py-1 rounded-2xl hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 mx-auto"
                onClick={clearSession}>
                خروج
              </button>
            </span>
          ) : (
            <Button text={"تسجيل الدخول"} url={"login"} />
          )}
        </ul>
      </div>
    </div>
  );
}
