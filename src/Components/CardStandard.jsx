import { Card } from "flowbite-react";
import { Link } from "react-router";
import { getUserSession } from "../utils/getUserSession";
import { DeleteItem } from "./DeleteItem";

export default function CardStandard({ btnMassege, details }) {
  const user = getUserSession();
  const currentPath = window.location.pathname.includes("halls")
    ? "halls"
    : "photography";

  let descriptionLength =
    details.description.length > 100
      ? details.description.slice(0, 100)
      : details.description;
  return (
    <div className="w-full my-5 hover:cursor-pointer">
      <Card className="max-w-sm  text-(--color-text-black) bg-transparent! hover:shadow-[#641888e3] shadow-lg duration-200">
        <div className=" h-full">
          <img
            loading="lazy"
            src={details.header_img || null}
            alt="img"
            className="rounded-2xl h-full"
          />
        </div>
        <h5 className="text-xl text-center font-semibold">{details.title}</h5>

        <p className="text-center"> {descriptionLength} </p>
        <div className="">
          <p className="text-3xl text-center pb-5 font-bold">
            {details.price} ج.م
          </p>
          <div className="text-center text-2xl pt-4">
            <Link
              to={`${details.id}`}
              className="bg-(--color-text-gold)  px-3 py-1.5 rounded-2xl hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 ">
              {btnMassege}
            </Link>
            {user?.role === "admin" && (
              <button
                onClick={() => DeleteItem(currentPath, details.id)}
                className="bg-red-700 m-3 px-2 py-1.5 hover:cursor-pointer rounded-2xl hover:bg-[#790000] text-amber-50 duration-500 ">
                حذف
              </button>
            )}
            {user?.role === "admin" &&
              (currentPath === "photography" ? (
                <Link
                  to={`/management/updatePhotography/${details.id}`}
                  className="bg-indigo-700 m-3 px-2 py-1.5 hover:cursor-pointer rounded-2xl hover:bg-indigo-950 text-amber-50 duration-500">
                  تعديل
                </Link>
              ) : currentPath === "halls" ? (
                <Link
                  to={`/management/updateHall/${details.id}`}
                  className="bg-indigo-700 m-3 px-2 py-1.5 hover:cursor-pointer rounded-2xl hover:bg-indigo-950 text-amber-50 duration-500">
                  تعديل
                </Link>
              ) : null)}
          </div>
        </div>
      </Card>
    </div>
  );
}
