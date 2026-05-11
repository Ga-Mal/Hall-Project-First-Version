import { useState } from "react";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { useLocatoinsStore } from "../zustand/locationsStore";

const EGYPT_ZONES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بورسعيد", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "أسيوط", "أسوان"
];

export default function AddLocation() {
  const [loading, setLoading] = useState(false);
  const [headerImg, setHeaderImg] = useState(null);
  const [galleryImgs, setGalleryImgs] = useState([]);
  const { addLocation } = useLocatoinsStore();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "locations",
    zone: "القاهرة",
    address: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= VALIDATION =================
  const validateFile = (file) => {
    const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
    if (!file.type.startsWith("image/")) {
      Swal.fire("خطأ", "يجب رفع صورة فقط", "error");
      return false;
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      Swal.fire("خطأ", "حجم الصورة كبير جدًا (أقصى 5MB)", "error");
      return false;
    }
    return true;
  };

  const shouldCompress = (file) => {
    const MAX_SIZE_BEFORE_COMPRESS = 500 * 1024; // 500KB
    if (file.size <= MAX_SIZE_BEFORE_COMPRESS) return false;
    const unsupportedTypes = ["image/png", "image/gif", "image/svg+xml", "image/webp"];
    if (unsupportedTypes.includes(file.type)) return false;
    return true;
  };

  const compress = async (file) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        initialQuality: 0.8,
        useWebWorker: true,
      });
    } catch (err) {
      console.error("Compression failed:", err);
      return file;
    }
  };

  const processImages = async (files) => {
    const validFiles = files.filter((file) => validateFile(file));
    const results = await Promise.all(
      validFiles.map(async (file) => {
        if (!shouldCompress(file)) return file;
        return await compress(file);
      })
    );
    return results;
  };

  // ================= HANDLERS =================
  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const [processed] = await processImages([file]);
      setHeaderImg(processed || null);
    } catch (err) {
      console.error("Header image error:", err);
    }
  };

  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length > 10) {
      Swal.fire("تنبيه", "يمكنك رفع 10 صور فقط كحد أقصى", "warning");
      return;
    }
    try {
      const processed = await processImages(files);
      setGalleryImgs(processed);
    } catch (err) {
      console.error("Gallery images error:", err);
    }
  };

  // ================= SUBMIT =================
  const submitLocation = async (e) => {
    e.preventDefault();
    if (!headerImg) return Swal.fire("خطأ", "يجب رفع صورة الهيدر", "error");
    if (!galleryImgs.length) return Swal.fire("خطأ", "يجب رفع صور المعرض", "error");

    setLoading(true);
    try {
      const locationData = {
        ...form,
        price: Number(form.price) || 0,
      };

      const { error } = await addLocation(locationData, headerImg, galleryImgs);
      if (error) throw error;

      setForm({
        title: "",
        price: "",
        category: "locations",
        zone: "القاهرة",
        address: "",
        phone: "",
        whatsapp: "",
        description: "",
      });
      setHeaderImg(null);
      setGalleryImgs([]);
      Swal.fire({ title: "تم الإضافة بنجاح", icon: "success", timer: 1500 });
    } catch (err) {
      Swal.fire({ title: "حدث خطأ أثناء الإضافة", text: err.message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-[#0000007b]/30 p-6 mt-2 w-[80%] mx-auto backdrop-blur-xl shadow-lg rounded-xl" onSubmit={submitLocation}>
      <h1 className="text-xl font-bold mb-4">إضافة مصور</h1>

      <div className="grid grid-cols-1 gap-4 text-start">
        <input value={form.title} name="title" placeholder="اسم المصور" className="input" onChange={handleChange} required />
        <input value={form.price} name="price" placeholder="السعر - بحد اقصي  100000 الف جنية" className="input" onChange={handleChange} required />
        
        {/* اختيار المحافظة */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold mr-1">المحافظة (نطاق العمل)</label>
          <select name="zone" value={form.zone} className="input cursor-pointer" onChange={handleChange} required>
            {EGYPT_ZONES.map((city) => (
              <option key={city} value={city} className="bg-gray-800 text-white">
                {city}
              </option>
            ))}
          </select>
        </div>

        <input value={form.address} name="address" placeholder="العنوان بالتفصيل" className="input" onChange={handleChange} required />
        <input value={form.phone} name="phone" placeholder="رقم الهاتف" className="input" onChange={handleChange} required />
        <input value={form.whatsapp} name="whatsapp" placeholder="WhatsApp" className="input" onChange={handleChange} required />
        <textarea value={form.description} name="description" placeholder="الوصف" className="input h-32" onChange={handleChange} required />

        <label className="font-semibold">صورة الهيدر:</label>
        <input type="file" accept="image/*" onChange={handleHeaderImg} className="input" />

        <label className="font-semibold">مجموعة الصور:</label>
        <input type="file" accept="image/*" multiple onChange={handleGalleryImgs} className="input" />

        <button
          disabled={loading}
          type="submit"
          className="w-[50%] mx-auto! custom-button"
        >
          {loading ? (
            <>
              <span>جاري الإرسال...</span>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            </>
          ) : (
            "إرسال البيانات"
          )}
        </button>
      </div>
    </form>
  );
}