import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";

export default function ReservationForm() {
  const { hallID, photographyID } = useParams();
  const location = useLocation();
  const isHall = location.pathname.includes("halls");
  const isPhotography = location.pathname.includes("photography");
  const serviceID = hallID || photographyID;
  const currentService = isHall ? "halls" : isPhotography ? "locations" : null;
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
    const { data, error } = await supabase
      .from(currentService)
      .select("title")
      .eq("id", serviceID)
      .single();
    if (error) {
      console.error("Error fetching service details:", error);
      return;
    }
    setFormData((prevData) => ({ ...prevData, serviceName: data.title }));
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHall = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("access_key", "f3993f35-5c98-497d-930c-11acae64271b"); // Web3Forms Key
    form.append("subject", formData.subject);
    form.append("client name", formData.clientName);
    form.append("service name", formData.serviceName);
    form.append("service ID", formData.serviceID);
    form.append("phone", formData.phone);
    form.append("whatsapp", formData.whatsapp);
    form.append("to_email", "gamalabdelfattah098@gmail.com");
    form.append("message", formData.details);

    try {
      // Send data to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      // Save order to Supabase
      const {error} = await supabase.from("orders").insert([
        {
          hall_id: isHall ? formData.serviceID : null,
          location_id: isPhotography ? formData.serviceID : null,
          client_name: formData.clientName,
          service_name: formData.serviceName,
          client_phone: formData.phone,
          client_whatsapp: formData.whatsapp,
          details: formData.details,
          service_id: formData.serviceID,
        },
      ]);

      if (response.ok && !error) {
        setFormData({
          clientName: "",
          phone: "",
          whatsapp: "",
          details: "",
          serviceID: null,
          serviceName: "",
        });
        Swal.fire({
          title: "طلبك وصلنا 😃",
          text: `أهلا ${formData.clientName}، شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.`,
          icon: "success",
          confirmButtonText: "تمام",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <div className="mt-20">
      <form
        onSubmit={submitHall}
        className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-lg rounded-xl">
        <h1 className="text-xl text-center font-bold mb-4">طلب الخدمة</h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            value={formData.clientName}
            name="clientName"
            placeholder="اسم العميل"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            value={formData.phone}
            name="phone"
            placeholder="رقم الهاتف"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            value={formData.whatsapp}
            name="whatsapp"
            placeholder="رقم واتساب"
            className="input"
            onChange={handleChange}
            required
          />

          <textarea
            value={formData.details}
            name="details"
            placeholder="تفاصيل اضافية , يرجي كتابة اسم الخدمة المطلوبة مع اضافة ملاحظاتك"
            className="input"
            onChange={handleChange}
            required></textarea>

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
