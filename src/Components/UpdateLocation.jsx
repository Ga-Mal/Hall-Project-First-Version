import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocatoinsStore } from "../zustand/locationsStore";
import toast from "react-hot-toast";

const EGYPT_ZONES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بورسعيد", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "أسيوط", "أسوان"
];

export default function UpdateLocation() {
  const { updatePhotographyID } = useParams();
  const navigate = useNavigate();
  const { getLocationById, updateLocation, loading } = useLocatoinsStore();
  const location = getLocationById(Number(updatePhotographyID));
  
  const [headerImg, setHeaderImg] = useState(null);
  const [galleryImgs, setGalleryImgs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "photography",
    zone: "القاهرة", // الحقل الموحد للمحافظة
    address: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  useEffect(() => {
    if (!location) return;

    setForm({
      title: location.title || "",
      price: location.price || "",
      category: location.category || "photography",
      zone: location.zone || "القاهرة",
      address: location.address || "",
      phone: location.phone || "",
      whatsapp: location.whatsapp || "",
      description: location.description || "",
    });
  }, [location, updatePhotographyID]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    if (file) setHeaderImg(file);
  };

  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    setGalleryImgs(files);
  };

  const submitLocation = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        category: "photography",
        zone: form.zone, 
        address: form.address.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
      };

      await updateLocation(location.id, payload, headerImg, galleryImgs);
      toast.success("تم تعديل المصور بنجاح ✅", { duration: 3000 });
      navigate(-1);

    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء تعديل المصور ❌", { duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={submitLocation}
      className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-lg rounded-xl text-start"
    >
      <h1 className="text-xl font-bold mb-4">تعديل بيانات المصور</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          value={form.title}
          name="title"
          placeholder="اسم المصور"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.price}
          name="price"
          placeholder=" السعر - بحد اقصي  50000 الف جنية"
          className="input"
          onChange={handleChange}
          required
        />

        {/* قائمة اختيار المحافظة */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold mr-1">المحافظة (نطاق العمل):</label>
          <select
            name="zone"
            value={form.zone}
            className="input cursor-pointer"
            onChange={handleChange}
            required
          >
            {EGYPT_ZONES.map((city) => (
              <option key={city} value={city} className="bg-gray-800 text-white">
                {city}
              </option>
            ))}
          </select>
        </div>

        <input
          value={form.address}
          name="address"
          placeholder="العنوان بالتفصيل"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.phone}
          name="phone"
          placeholder="رقم الهاتف"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.whatsapp}
          name="whatsapp"
          placeholder="WhatsApp"
          className="input"
          onChange={handleChange}
          required
        />

        <textarea
          value={form.description}
          name="description"
          placeholder="الوصف"
          className="input h-32"
          onChange={handleChange}
          required
        />

        <label className="font-semibold">تغيير صورة الهيدر (اختياري):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleHeaderImg}
          className="input"
        />

        <label className="font-semibold">تغيير مجموعة الصور (اختياري):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImgs}
          className="input"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 cursor-pointer 
               hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 
               flex items-center justify-center gap-2 rounded-2xl"
        >
          {loading ? (
            <>
              <span>جاري التعديل...</span>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            </>
          ) : (
            "تعديل البيانات"
          )}
        </button>
      </div>
    </form>
  );
}