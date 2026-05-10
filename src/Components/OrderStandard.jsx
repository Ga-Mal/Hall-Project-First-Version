import { BiNotepad } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { styleBtnStatus } from "./AllOrders";
import { PiPhone, PiWhatsappLogo } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5"; 
import Swal from "sweetalert2";
import { supabase } from "../utils/supabaseClient";

function OrderStandard({ orderData, onRefresh }) {
  const getServiceName = orderData.hall_id !== null ? "قاعة" : "مصور";
  const orderDetails = orderData.hall_id !== null ? orderData.halls : orderData.locations;

  // وظيفة القبول
  const handleAccept = async () => {
    const { error } = await supabase.from("orders").update({ status: "accepted" }).eq("id", orderData.id);

    if (!error) {
      Swal.fire("تم!", "تم قبول الطلب بنجاح", "success");
      onRefresh();
    }
  };

  // وظيفة الحذف (الرفض)
  const handleDelete = async () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف هذا الطلب نهائياً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase.from("orders").delete().eq("id", orderData.id);
        if (!error) {
          Swal.fire("محذوف!", "تم حذف الطلب.", "success");
          onRefresh();
        }
      }
    });
  };

  return (
    <section className="relative flex flex-col h-full p-4 text-lg text-start hover:shadow-lg duration-200 shadow-purple-500 bg-[#0000007b]/30 rounded-2xl text-gray-700 font-semibold border border-white/10">
      
      {/* علامة الصح الخضراء في حال القبول */}
      {orderData.status === "accepted" && (
        <div className="absolute top-2 left-2 text-green-500 ">
          <IoCheckmarkCircle size={35} />
        </div>
      )}

      <section className="flex justify-between items-center">
        <p className="text-center mb-3 text-sm opacity-70">تاريخ الطلب {new Date(orderData.created_at).toLocaleString('ar-EG')}</p>
      </section>

      <section className="bg-[#ffffff]/30 p-4 rounded-xl space-y-2">
        <p className="flex items-center gap-2"> <CgProfile size={23} className="shrink-0" /> <span>{orderData.client_name}</span></p>
        <p className="flex items-center gap-2"> <PiPhone size={23} className="shrink-0" /> <span>{orderData.client_phone}</span></p>
        <p className="flex items-center gap-2"> <PiWhatsappLogo size={23} className="shrink-0" /> <span>{orderData.client_whatsapp}</span></p>
        <p className="flex items-start gap-2"> <BiNotepad size={23} className="shrink-0" /> <span>{orderData.details}</span></p>
      </section>

      <section className="mt-4 text-sm">
        <p className="underline mb-2 font-bold text-purple-900">بيانات الخدمة ({getServiceName}) | #{orderData.service_id}</p>
        <p>اسم الخدمة: {orderData.service_name}</p>
        <p>السعر: {orderDetails?.price} ج.م</p>
        <p>العنوان: {orderDetails?.address}</p>
        <p>الهاتف: {orderDetails?.phone}</p>
        <p>الواتساب: {orderDetails?.whatsapp}</p>
        <p>المحافظة: {orderDetails?.zone}</p>
      </section>

      <section className="text-center pt-4 mt-auto flex gap-2 justify-center">
        {orderData.status !== "accepted" && (
          <button onClick={handleAccept} className={`${styleBtnStatus} border border-green-600 bg-green-500/50 hover:bg-green-500 flex-1`}>
            قبول
          </button>
        )}
        <button onClick={handleDelete} className={`${styleBtnStatus} border border-red-700 bg-red-500/50 hover:bg-red-500 flex-1`}>
          حذف
        </button>
      </section>
    </section>
  );
}

export default OrderStandard;
