import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useHallsStore } from "../zustand/hallsStore";
import toast from "react-hot-toast";

const EGYPT_ZONES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بورسعيد", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "أسيوط", "أسوان"
];

export default function UpdateHall() {
  const { updateHallID } = useParams();
  const { getHallById, updateHall, loading } = useHallsStore();
  const navigate = useNavigate();
  const hall = getHallById(Number(updateHallID));
  
  const [headerFile, setHeaderFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "halls",
    zone: "القاهرة", 
    address: "",
    hall_location: "",
    phone: "",
    whatsapp: "",
    description: "",
    extensions: [{ name: "", peaces: 0, price: 0 }],
  });

  useEffect(() => {
    if (!hall) return;

    setForm({
      title: hall.title || "",
      price: hall.price || "",
      category: hall.category || "halls",
      zone: hall.zone || "القاهرة", // تحميل المحافظة المسجلة مسبقاً
      address: hall.address || "",
      hall_location: hall.hall_location || "",
      phone: hall.phone || "",
      whatsapp: hall.whatsapp || "",
      description: hall.description || "",
      extensions: hall.extensions || []
    });
  }, [hall]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHeaderImg = (e) => {
    const file = e.target.files[0];
    if (file) setHeaderFile(file);
  };

  const handleGalleryImgs = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
  };

  const addExtension = () => {
    setForm({ ...form, extensions: [...form.extensions, { name: "", peaces: "", price: "" }] });
  };

  const handleExtensionChange = (i, e) => {
    const updated = [...form.extensions];
    updated[i][e.target.name] = e.target.value;
    setForm({ ...form, extensions: updated });
  };

  const deleteExtension = (indexToDelete) => {
    const updatedExtensions = form.extensions.filter((_, index) => index !== indexToDelete);
    setForm({ ...form, extensions: updatedExtensions });
  };

  const submitHall = async (e) => {
    e.preventDefault();

    try {
      const cleanedExtensions = form.extensions
        .filter(e => e.name && e.name.trim() !== "")
        .map(e => ({
          name: e.name.trim(),
          peaces: Number(e.peaces) || 0,
          price: Number(e.price) || 0,
        }));

      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        category: "halls",
        zone: form.zone, // إرسال المحافظة المختارة
        address: form.address.trim(),
        hall_location: form.hall_location.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
        extensions: cleanedExtensions,
        header_img: hall.header_img,
        imgs: hall.imgs
      };

      await updateHall(hall.id, payload, headerFile, galleryFiles);
      toast.success("تم تعديل القاعة بنجاح 🎉", { duration: 3000 });
      navigate("/halls");

    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء تعديل القاعة ❌", { duration: 3000 });
    }
  };

  return (
    <form onSubmit={submitHall} className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) rounded-xl">
      <h1 className="text-xl font-bold mb-4">تعديل القاعة</h1>

      <div className="grid gap-4 text-start">
        <input value={form.title} name="title" placeholder="اسم القاعة" className="input" onChange={handleChange} required />
        <input value={form.price} name="price" placeholder="السعر - بحد اقصي  300000 الف جنية" className="input" onChange={handleChange} required />
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold mr-1">المحافظة:</label>
          <select name="zone" value={form.zone} className="input cursor-pointer" onChange={handleChange} required>
            {EGYPT_ZONES.map((city) => (
              <option key={city} value={city} className="bg-gray-800 text-white">
                {city}
              </option>
            ))}
          </select>
        </div>

        <input value={form.address} name="address" placeholder="العنوان بالتفصيل" className="input" onChange={handleChange} required />
        <input value={form.hall_location} name="hall_location" placeholder="لينك القاعة" className="input" onChange={handleChange} required />
        <input value={form.phone} name="phone" placeholder="رقم الهاتف" className="input" onChange={handleChange} required />
        <input value={form.whatsapp} name="whatsapp" placeholder="WhatsApp" className="input" onChange={handleChange} required />
        <textarea value={form.description} name="description" placeholder="الوصف" className="input h-32" onChange={handleChange} required />

        <label className="font-semibold">تغيير صورة الهيدر (اختياري)</label>
        <input type="file" accept="image/*" onChange={handleHeaderImg} className="input" />

        <label className="font-semibold">تغيير صور المعرض (اختياري)</label>
        <input type="file" accept="image/*" multiple onChange={handleGalleryImgs} className="input" />

        <div>
          <h3 className="font-bold mb-2">الإضافات</h3>
          {form.extensions.map((ext, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={ext.name} name="name" placeholder="الاسم" onChange={(e) => handleExtensionChange(i, e)} className="input" />
              <input value={ext.peaces} name="peaces" placeholder="عدد" onChange={(e) => handleExtensionChange(i, e)} className="input" />
              <input value={ext.price} name="price" placeholder="السعر" onChange={(e) => handleExtensionChange(i, e)} className="input" />
              <button onClick={() => deleteExtension(i)} type="button" className="bg-red-600 px-4 rounded-full font-bold cursor-pointer hover:text-white duration-300">X</button>
            </div>
          ))}

          <button disabled={loading} onClick={addExtension} type="button" className="px-3 py-1 my-5 bg-(--color-text-gold) hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 rounded-2xl cursor-pointer">
            إضافة جديدة
          </button>
        </div>

        <button disabled={loading} type="submit" className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 cursor-pointer hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 flex items-center justify-center gap-2 rounded-2xl">
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