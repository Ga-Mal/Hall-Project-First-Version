import { Card } from "flowbite-react";
import { Link } from "react-router";
import { getUserSession } from "../utils/getUserSession";
import { useHallsStore } from "../zustand/hallsStore";
import { useLocatoinsStore } from "../zustand/locationsStore";
import Swal from "sweetalert2";
import { LocationEditIcon } from "lucide-react";

export default function CardStandard({ btnMassege, details }) {
  const user = getUserSession();
  let descriptionLength = details.description.length > 100 ? details.description.slice(0, 100) : details.description;
  const currentPath = window.location.pathname.includes("halls") ? "halls" : "photography";
  const { deleteHall, fetchHalls, error } = useHallsStore();
  const {deleteLocation , fetchLocations , errors} = useLocatoinsStore();

  const deleteitem = async () => {
    if (currentPath === "halls") {
      const confirmResult = await Swal.fire({
        title: "هل أنت متأكد من الحذف؟",
        text: "لن تتمكن من التراجع عن هذا الإجراء!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
      });

      if (!confirmResult.isConfirmed) return;

      deleteHall(Number(details.id));

      if (!error) {
        fetchHalls();
        return;
      }
    }
    if(currentPath === "photography"){
        const confirmResult = await Swal.fire({
        title: "هل أنت متأكد من الحذف؟",
        text: "لن تتمكن من التراجع عن هذا الإجراء!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
      });
      if(!confirmResult.isConfirmed) return;
      deleteLocation(Number(details.id));
      if(!errors){
        fetchLocations();
        return;
      }
    }
  };
  
  return (
    <div className="w-full h-full">
      <Card className="max-w-sm h-full flex flex-col border-purple-700! border-2 text-(--color-text-black) bg-gray-200! hover:shadow-[#641888e3] shadow-lg duration-200">
        <div className="h-full overflow-hidden ">
          <img alt="img" loading="lazy" src={details.header_img || null} className="rounded-t-[10px] w-full h-full object-cover" />
        </div>

        <p className="text-purple-700 font-bold flex gap-x-2"> <LocationEditIcon size={20} /> {details.zone} </p>
        <h5 className="text-xl text-center font-semibold">{details.title}</h5>

        <p className="text-center"> {descriptionLength} </p>
        <div>
          <p className="text-3xl text-center pb-3 font-bold">
            {details.price} ج.م
          </p>
          <div className="text-center text-[20px]">
            <Link to={`${details.id}`}
              className={`bg-yellow-600/60 border ${user?.role !== "admin" ? "block" : "" } border-yellow-600 font-semibold text-gray-50 px-2 py-1 rounded-[10px] hover:bg-yellow-300/60 duration-100`}
            >
              {btnMassege}
            </Link>
            {user?.role === "admin" && (
              <button
                onClick={() => deleteitem()}
                className="bg-red-700/60 border border-red-600 hover:bg-red-500 text-gray-50 mx-3 px-2 py-1 hover:cursor-pointer rounded-[10px] duration-100 ">
                حذف
              </button>
            )}
            {user?.role === "admin" &&
              (currentPath === "photography" ? (
                <Link
                  to={`/management/updatePhotography/${details.id}`}
                  className="bg-indigo-700/60 border border-indigo-800 px-2 py-1 hover:cursor-pointer rounded-[10px] hover:bg-indigo-500 text-amber-50 duration-100">
                  تعديل
                </Link>
              ) : currentPath === "halls" ? (
                <Link
                  to={`/management/updateHall/${details.id}`}
                  className="bg-indigo-700/80 border border-indigo-800 px-2 py-1 hover:cursor-pointer rounded-[10px] hover:bg-indigo-500 text-amber-50 duration-100">
                  تعديل
                </Link>
              ) : null)}
          </div>
        </div>
      </Card>
    </div>
  );
}
