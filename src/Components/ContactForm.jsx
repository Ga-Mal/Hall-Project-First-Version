import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const styleInput = "border border-gray-200 rounded-[10px] py-2 px-4 focus:border-none focus:ring-2 shadow-purple-700 focus:shadow-md focus:ring-purple-700 focus:outline-none";

export default function ContactForm() {
  const navigate = useNavigate();
  const user = localStorage.getItem("session_token");
  
  // الحالة الخاصة بالتحميل
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "طلب تواصل من PartyVenue",
    clientName: "",
    phone: "",
    whatsapp: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // التأكد من تسجيل الدخول أولاً قبل أي شيء
    if (!user) {
      Swal.fire({
        title: "يرجى تسجيل الدخول ❌",
        text: `يا ${formData.clientName || 'كابتن'} لازم تسجل دخول أولا 🙂.`,
        icon: "error",
        confirmButtonText: "التوجه لتسجيل الدخول",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!formData.clientName || !formData.phone || !formData.whatsapp || !formData.details) {
      Swal.fire({
        title: "جميع الحقول مطلوبة ❌",
        text: `يرجى ملء جميع الحقول قبل الإرسال.`,
        icon: "error",
      });
      return;
    }

    // تفعيل حالة التحميل وتعطيل الزر
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "f3993f35-5c98-497d-930c-11acae64271b");
    form.append("clientName", formData.clientName);
    form.append("phone", formData.phone);
    form.append("whatsapp", formData.whatsapp);
    form.append("to_email", "gamalabdelfattah098@gmail.com");
    form.append("subject", formData.subject);
    form.append("message", formData.details);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form });

      if (response.ok) {
        setFormData({
          subject: "طلب تواصل من PartyVenue",
          clientName: "",
          phone: "",
          whatsapp: "",
          details: "",
        });
        Swal.fire({
          title: "تم الإرسال بنجاح ✅",
          text: `شكراً يا ${formData.clientName}، تم استلام رسالتك وسنتواصل معك قريباً.`,
          icon: "success",
        });
      } else {
        throw new Error("فشل في الإرسال");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "خطأ في الإرسال ❌",
        text: "حدثت مشكلة أثناء إرسال البيانات، يرجى المحاولة لاحقاً.",
        icon: "error",
      });
    } finally {
      // إيقاف حالة التحميل وتفعيل الزر مرة أخرى في كل الحالات
      setLoading(false);
    }
  };

  return (
    <div className="md:my-20 my-10">
      <form
        onSubmit={submitForm}
        className="p-6 mt-2 w-full md:w-[80%] mx-auto bg-[#0000007b]/30 backdrop-blur-xl shadow-purple-900 md:shadow-2xl shadow-lg rounded-xl">
        <h1 className="text-xl font-bold mb-4">
          أدخل بياناتك وسيتم التواصل معك
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <input className={styleInput} name="clientName" placeholder="الاسم" value={formData.clientName} onChange={handleChange} required />
          <input className={styleInput} name="phone" type="tel" inputMode="numeric" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
          <input className={styleInput} name="whatsapp" type="tel" inputMode="numeric" placeholder="رقم واتساب" value={formData.whatsapp} onChange={handleChange} required />

          <textarea name="details" placeholder="سبب التواصل" value={formData.details} className={styleInput} onChange={handleChange} required></textarea>
          
          <button
            type="submit"
            disabled={loading} // تعطيل الزر هنا
            className={`w-[50%] mx-auto px-3 py-1.5 rounded-2xl cursor-pointer text-(--color-text-light) duration-500 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-(--color-hover) hover:bg-[#38084e]"}`}>
            {loading ? "جاري الإرسال..." : "إرسال البيانات"}
          </button>
        </div>
      </form>
    </div>
  );
}