import "./App.css";
import { lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import UpdateHall from "./Components/UpdateHall";
import UpdateLocation from "./Components/updateLocation";
const AddHall = lazy(() => import("./Components/addHall"));
const AdminManagement = lazy(() => import("./Components/AdminManagement"));
const AddLocation = lazy(() => import("./Components/AddLocation"));
const GuestRoute = lazy(() => import("./utils/GuestRoute"));
const UserRoute = lazy(() => import("./utils/UserRoute"));
const AdminRoute = lazy(() => import("./utils/AdminRoute"));
const NotFoundOrErrorPage = lazy(() =>
  import("./Components/NotFoundOrErrorPage")
);
const ScrollToTop = lazy(() => import("./Components/ScrollToTop"));
const Halls = lazy(() => import("./Pages/Halls"));
const HallPageDetails = lazy(() => import("./Components/HallPageDetails"));
const Home = lazy(() => import("./Pages/Home"));
const Photography = lazy(() => import("./Pages/Photography"));
const PhotographyPageDetails = lazy(() =>
  import("./Components/PhotographyPageDetails")
);
const Navbar = lazy(() => import("./Components/Navbar"));
const Footer = lazy(() => import("./Components/Footer"));
const ReservationForm = lazy(() => import("./Components/ReservationForm"));
const AuthLayout = lazy(() => import("./Layout/AuthLayout"));
const RegisterForm = lazy(() => import("./Pages/Register"));
const LoginForm = lazy(() => import("./Pages/Login"));

function MainLayout() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Toaster position="top-center" />

      <Navbar />
      <div className="">
        <ScrollToTop />
        <div className="flex-1 flex flex-col">
          <div className="mb-10 flex-1 overflow-hidden">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg bg-yellow-500 text-white font-bold
          transition-all duration-500 ease-out
          ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }
          hover:bg-yellow-600 hover:shadow-2xl w-10 hover:cursor-pointer`}>
        ↑
      </button>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "halls", element: <Halls /> },
      { path: "photography", element: <Photography /> },

      {
        path: "halls/:hallID",
        element: (
          <UserRoute>
            <HallPageDetails />
          </UserRoute>
        ),
      },
      {
        path: "halls/:hallID/reservation",
        element: (
          <UserRoute>
            <ReservationForm />
          </UserRoute>
        ),
      },

      {
        path: "photography/:photographyID",
        element: (
          <UserRoute>
            <PhotographyPageDetails />
          </UserRoute>
        ),
      },
      {
        path: "photography/:photographyID/reservation",
        element: (
          <UserRoute>
            <ReservationForm />
          </UserRoute>
        ),
      },

      // ADMIN ONLY
      {
        path: "management",
        element: (
          <AdminRoute>
            <AdminManagement />
          </AdminRoute>
        ),
        children: [
          { path: "addHall", element: <AddHall /> },
          { path: "addLocation", element: <AddLocation /> },
          { path: "updateHall/:updateHallID", element: <UpdateHall /> },
          {
            path: "updatePhotography/:updatePhotographyID",
            element: <UpdateLocation />,
          },
        ],
      },

      { path: "*", element: <NotFoundOrErrorPage /> }, // catch-all
    ],
  },
  {
    path: "login",
    element: (
      <GuestRoute>
        <LoginForm />
      </GuestRoute>
    ),
  },
  {
    path: "register",
    element: (
      <GuestRoute>
        <RegisterForm />
      </GuestRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
