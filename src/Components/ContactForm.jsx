import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ContactForm() {
  const navigate = useNavigate();
  const user = localStorage.getItem("session_token");
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

    if (!formData.clientName ||!formData.phone ||!formData.whatsapp ||!formData.details) {
      Swal.fire({
        title: "جميع الحقول مطلوبة ❌",
        text: `يرجى ملء جميع الحقول قبل الإرسال.`,
        icon: "error",
      });
      return;
    }
    const form = new FormData();
    form.append("access_key", "f3993f35-5c98-497d-930c-11acae64271b"); // Web3Forms Key
    form.append("clientName", formData.clientName);
    // form.append("ContactForm", formData.name);
    form.append("phone", formData.phone);
    form.append("whatsapp", formData.whatsapp);
    form.append("to_email", "gamalabdelfattah098@gmail.com");
    form.append("subject", formData.subject);
    form.append("message", formData.details);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setFormData({
          clientName: "",
          phone: "",
          whatsapp: "",
          details: "",
        });
        Swal.fire({
          title: "تم الإرسال بنجاح ✅",
          text: `شكراً يا ${formData.clientName}، تم استلام رسالتك وسنتواصل معك قريباً.`,
        });
      }

      if (!user) {
        Swal.fire({
          title: "يرجى تسجيل الدخول ❌",
          text: `يا ${formData.clientName} لازم تسجل دخول أولا 🙂.`,
          icon: "error",
          confirmButtonText: "التوجه لتسجيل الدخول",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <div className="md:my-20 my-10">
      <form
        onSubmit={submitForm}
        className="nav p-6 mt-2 w-full md:w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-purple-900 md:shadow-2xl shadow-lg rounded-xl">
        <h1 className="text-xl font-bold mb-4">
          أدخل بياناتك وسيتم التواصل معك
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <input name="clientName" placeholder="الاسم" value={formData.clientName} className="input" onChange={handleChange} required />
          <input name="phone" placeholder="رقم الهاتف" value={formData.phone} className="input" onChange={handleChange} required />
          <input name="whatsapp" placeholder="رقم واتساب" value={formData.whatsapp} className="input" onChange={handleChange} required />

          <textarea name="details" placeholder="سبب التواصل" value={formData.details} className="input" onChange={handleChange} required></textarea>
          <button
            type="submit"
            className="w-[50%] mx-auto bg-(--color-hover) px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-[#38084e] text-(--color-text-light) duration-500">
            إرسال البيانات
          </button>
        </div>
      </form>
    </div>
  );
}
