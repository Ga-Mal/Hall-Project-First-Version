import Swal from "sweetalert2";
import { supabase } from "../utils/supabaseClient";

export const DeleteItem = async (service, id) => {
  const confirmResult = await Swal.fire({
    title: "هل أنت متأكد من الحذف؟",
    text: "لن تتمكن من التراجع عن هذا الإجراء!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم، احذفها!",
    cancelButtonText: "إلغاء",
  });

  if (!confirmResult.isConfirmed) return;

  const localKey = `${service}Data`;
  const cachedData = JSON.parse(localStorage.getItem(localKey)) || [];

  const newCachedData = cachedData.filter((item) => item.id !== id);

  localStorage.setItem(localKey, JSON.stringify(newCachedData));

  const { error } = await supabase.from(service).delete().eq("id", id);

  if (error) {
    Swal.fire({
      title: "خطأ في الحذف ❌",
      text: "حدث خطأ أثناء محاولة الحذف. يرجى المحاولة مرة أخرى.",
      icon: "error",
      confirmButtonText: "حسناً",
    });
    return;
  }
  Swal.fire({
    title: "تم الحذف بنجاح",
    icon: "success",
    confirmButtonText: "حسناً",
  }).then(() => {
    window.location.reload();
  });
};
