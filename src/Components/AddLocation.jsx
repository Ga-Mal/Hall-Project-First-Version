import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function AddLocation() {
  const [headerImg, setHeaderImg] = useState("");
  const [galleryImgs, setGalleryImgs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "locations",
    address: "",
    location: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHeaderImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setHeaderImg(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGalleryImgs = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((imgs) => setGalleryImgs(imgs));
  };

  const submitLocation = async (e) => {
    e.preventDefault();

    try {
      const locationData = {
        ...form,
        price: Number(form.price) || 0,
        header_img: JSON.stringify(headerImg),
        gallery_imgs: JSON.stringify(galleryImgs),
      };

      console.log("Final Location Data To Send:", locationData);

      const { data, error } = await supabase.from("locations").insert([locationData]);

      if (error) {
        console.error("Error inserting location:", error);
        alert("حدث خطأ أثناء إضافة اللوكيشن");
        return;
      }

      console.log("تم إضافة اللوكيشن:", data);
      alert("تم إضافة اللوكيشن بنجاح");

      // reset form
      setForm({
        title: "",
        price: "",
        address: "",
        location: "",
        phone: "",
        whatsapp: "",
        description: "",
      });
      setHeaderImg("");
      setGalleryImgs([]);
    } catch (err) {
      console.error("Submit Error:", err);
      alert("حدث خطأ أثناء الإرسال: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <form onSubmit={submitLocation} className="nav p-6 mt-2 w-[80%] mx-auto backdrop-blur-xl shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">إضافة لوكيشن</h1>

      <div className="grid grid-cols-1 gap-4">
        <input value={form.title} name="title" placeholder="اسم المكان" className="input" onChange={handleChange} required/>
        <input value={form.price} name="price" placeholder="السعر" className="input" onChange={handleChange} required/>
        <input value={form.address} name="address" placeholder="العنوان" className="input" onChange={handleChange} required/>
        <input value={form.location} name="location" placeholder="Location" className="input" onChange={handleChange} required/>
        <input value={form.phone} name="phone" placeholder="رقم الهاتف" className="input" onChange={handleChange} required/>
        <input value={form.whatsapp} name="whatsapp" placeholder="WhatsApp" className="input" onChange={handleChange} required/>
        <textarea value={form.description} name="description" placeholder="الوصف" className="input" onChange={handleChange} required></textarea>

        <label className="font-semibold">صورة الهيدر:</label>
        <input type="file" accept="image/*" onChange={handleHeaderImg} className="input" required/>

        <label className="font-semibold">مجموعة الصور:</label>
        <input type="file" accept="image/*" multiple onChange={handleGalleryImgs} className="input" required/>

        <button type="submit" className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500">
          إرسال البيانات
        </button>
      </div>
    </form>
  );
}
