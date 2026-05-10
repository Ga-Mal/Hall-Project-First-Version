import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { useHallsStore } from "../zustand/hallsStore";
import toast from "react-hot-toast";

const EGYPT_ZONES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "دمياط", "بورسعيد", "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "أسيوط", "أسوان"
];

export default function AddHall() {
  const { addHall, loading, error } = useHallsStore();
  const headerInputRef = useRef();
  const galleryInputRef = useRef();
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
    extensions: [{ name: "", peaces: "", price: "" }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const compress = async (file) => {
    return await imageCompression(file, { maxSizeMB: 1.3, maxWidthOrHeight: 5000, useWebWorker: true });
  };

  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let finalFile = file;
    if (!file.type.includes("svg")) {
      finalFile = await compress(file);
    }
    setHeaderFile(finalFile);
  };

  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    const processed = await Promise.all(
      files.map(async (file) => {
        if (file.type.includes("svg")) return file;
        return await compress(file);
      })
    );
    setGalleryFiles(processed);
  };

  const addExtension = () => {
    setForm({
      ...form,
      extensions: [...form.extensions, { name: "", peaces: "", price: "" }],
    });
  };

  const handleExtensionChange = (i, e) => {
    const updated = [...form.extensions];
    updated[i][e.target.name] = e.target.value;
    setForm({ ...form, extensions: updated });
  };

  const submitHall = async (e) => {
    e.preventDefault();
    const cleanedExtensions = form.extensions.filter((e) => e.name);
    try {
      await addHall({ ...form, price: Number(form.price.trim()), extensions: cleanedExtensions }, headerFile, galleryFiles);
      if (!error) {
        toast.success("تمت الإضافة بنجاح 🎉", { duration: 2000 });
        setForm({
          title: "",
          price: "",
          category: "halls",
          zone: "القاهرة",
          address: "",
          hall_location: "",
          phone: "",
          whatsapp: "",
          description: "",
          extensions: [{ name: "", peaces: "", price: "" }],
        });
        setHeaderFile(null);
        setGalleryFiles([]);
        if (headerInputRef.current) headerInputRef.current.value = "";
        if (galleryInputRef.current) galleryInputRef.current.value = "";
      } else {
        toast.error("حدث خطأ أثناء إضافة القاعة ❌", { duration: 2000 });
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء إضافة القاعة ❌", { duration: 2000 });
    }
  };

  const deleteExtension = (indexToDelete) => {
    const updatedExtensions = form.extensions.filter((_, index) => index !== indexToDelete);
    setForm({ ...form, extensions: updatedExtensions });
  };

  return (
    <form onSubmit={submitHall} className="bg-[#0000007b]/30 p-6 mt-2 w-[80%] mx-auto backdrop-blur-xl shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">إضافة قاعة جديدة</h1>
      <div className="grid grid-cols-1 gap-4 text-start">
        <input value={form.title} name="title" placeholder="اسم القاعة" className="input" onChange={handleChange} required />
        <input value={form.price} name="price" placeholder="السعر - بحد اقصي  300000 الف جنية" className="input" onChange={handleChange} required />
        
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

        <input value={form.address} name="address" placeholder="العنوان" className="input" onChange={handleChange} required />
        <input value={form.hall_location} name="hall_location" placeholder="لينك القاعة" className="input" onChange={handleChange} required />
        <input value={form.phone} name="phone" placeholder="رقم الهاتف" className="input" onChange={handleChange} required />
        <input value={form.whatsapp} name="whatsapp" placeholder="WhatsApp" className="input" onChange={handleChange} required />
        <textarea value={form.description} name="description" placeholder="الوصف" className="input h-32" onChange={handleChange} required />

        <label className="font-semibold">صورة الهيدر:</label>
        <input ref={headerInputRef} type="file" accept="image/*" onChange={handleHeaderImg} className="input" required />

        <label className="font-semibold">مجموعة الصور:</label>
        <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryImgs} className="input" required />

        <div>
          <h3 className="font-semibold mb-2">الإضافات</h3>
          {form.extensions.map((ext, i) => (
            <div key={i} className="flex gap-x-1.5 items-baseline mb-2">
              <input name="name" value={ext.name} placeholder="Name" className="input grid-cols-1" onChange={(e) => handleExtensionChange(i, e)} />
              <input name="peaces" value={ext.peaces} placeholder="Peaces" className="input" onChange={(e) => handleExtensionChange(i, e)} />
              <input name="price" value={ext.price} placeholder="Price" className="input" onChange={(e) => handleExtensionChange(i, e)} />
              <button onClick={() => deleteExtension(i)} type="button" className="bg-red-600 h-8 w-[100px] rounded-full font-bold cursor-pointer hover:text-(--color-text-light) duration-300">X</button>
            </div>
          ))}
          <button onClick={addExtension} type="button" className="px-3 py-1 my-5 bg-(--color-text-gold) hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 rounded-2xl cursor-pointer">
            إضافة جديدة
          </button>
        </div>

        <button type="submit" className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 cursor-pointer hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 flex items-center justify-center gap-2 rounded-2xl">
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