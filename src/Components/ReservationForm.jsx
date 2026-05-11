import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
import { styleInput } from "./ContactForm";

export default function ReservationForm() {
  const { hallID, photographyID } = useParams();
  const location = useLocation();
  const isHall = location.pathname.includes("halls");
  const isPhotography = location.pathname.includes("photography");
  const serviceID = hallID || photographyID;
  const currentService = isHall ? "halls" : isPhotography ? "locations" : null;

  // حالة التحميل
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: " طلب خدمة من PartyVenue",
    clientName: "",
    phone: "",
    whatsapp: "",
    details: "",
    serviceID: serviceID,
    serviceName: "",
  });

  const fetchServiceDetails = async () => {
    const { data, error } = await supabase.from(currentService).select("title").eq("id", serviceID).single();

    if (error) {
      console.error("Error fetching service details:", error);
      return;
    }
    setFormData((prevData) => ({ ...prevData, serviceName: data.title }));
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHall = async (e) => {
    e.preventDefault();
    
    // تفعيل حالة التحميل
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "f3993f35-5c98-497d-930c-11acae64271b");
    form.append("to_email", "gamalabdelfattah098@gmail.com");
    form.append("service name", formData.serviceName);
    form.append("client name", formData.clientName);
    form.append("service ID", formData.serviceID);
    form.append("whatsapp", formData.whatsapp);
    form.append("message", formData.details);
    form.append("subject", formData.subject);
    form.append("phone", formData.phone);

    try {
      // 1. إرسال البيانات لـ Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form });
      
      // 2. حفظ الطلب في Supabase
      const { error: supabaseError } = await supabase.from("orders").insert([
        {
          location_id: isPhotography ? formData.serviceID : null,
          hall_id: isHall ? formData.serviceID : null,
          service_name: formData.serviceName,
          client_whatsapp: formData.whatsapp,
          client_name: formData.clientName,
          service_id: formData.serviceID,
          client_phone: formData.phone,
          details: formData.details,
        }
      ]);

      if (response.ok && !supabaseError) {
        setFormData({
          subject: " طلب خدمة من PartyVenue",
          clientName: "", 
          phone: "", 
          whatsapp: "", 
          details: "", 
          serviceID: serviceID, 
          serviceName: formData.serviceName 
        });

        Swal.fire({
          title: "طلبك وصلنا 😃",
          text: `أهلا ${formData.clientName}، شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.`,
          icon: "success",
          confirmButtonText: "تمام",
        });
      } else {
        throw new Error("حدث خطأ أثناء المعالجة");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "عذراً ❌",
        text: "حدث خطأ أثناء إرسال طلبك، يرجى المحاولة مرة أخرى.",
        icon: "error",
      });
    } finally {
      // إيقاف حالة التحميل وتفعيل الزر
      setLoading(false);
    }
  };

  return (
    <section className="mt-20">
      <form className="p-6 mt-2 w-[80%] mx-auto bg-[#0000007b]/30 backdrop-blur-xl shadow-lg rounded-xl" onSubmit={submitHall}>
        <h1 className="text-xl text-center font-bold mb-4">طلب الخدمة</h1>
        <section className="grid grid-cols-1 gap-4">
          <input value={formData.clientName} name="clientName" placeholder="اسم العميل" className={styleInput} onChange={handleChange} required />  
          <input value={formData.phone} name="phone" type="tel" inputMode="numeric" placeholder="رقم الهاتف" className={styleInput} onChange={handleChange} required />
          <input value={formData.whatsapp} name="whatsapp" type="tel" inputMode="numeric" placeholder="رقم واتساب" className={styleInput} onChange={handleChange} required />
          <textarea value={formData.details} name="details" placeholder="تفاصيل اضافية , يرجي كتابة ملاحظاتك" className={styleInput} onChange={handleChange} required></textarea>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-[50%] mx-auto! custom-button">
            {loading ? "جاري الإرسال..." : "إرسال البيانات"}
          </button>
        </section>
      </form>
    </section>
  );
}