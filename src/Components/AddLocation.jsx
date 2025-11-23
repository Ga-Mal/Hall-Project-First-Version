import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

export default function AddLocation() {
  const [loading, setLoading] = useState(false);
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

  //  Storage optimization with image compression
  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 3000,
        useWebWorker: true,
      };
      // Compress the image file
      const compressedFile = await imageCompression(file, options);
      // Convert compressed file to base64
      const reader = new FileReader();
      reader.onloadend = () => setHeaderImg(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Header image compression error:", err);
    }
  };

  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 3000,
        useWebWorker: true,
      };
      // Compress the image files and convert to base64
      const compressedImgs = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, options);
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(compressedFile);
          });
        })
      ).then((imgs) => setGalleryImgs(imgs));
    } catch (err) {
      console.error("Gallery images compression error:", err);
    }
  };

  const submitLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const locationData = {
        ...form,
        price: Number(form.price) || 0,
        header_img: JSON.stringify(headerImg),
        gallery_imgs: JSON.stringify(galleryImgs),
      };

      const { error } = await supabase.from("locations").insert([locationData]);

      if (!error) {
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
        setLoading(false);
        return;
      }
        console.error("Error inserting location:", error);
        Swal.fire({
          title: "حدث خطأ أثناء إضافة اللوكيشن",
          icon: "error",
          timer:1500,
        })
        console.log(error.message);
        setLoading(false);

    } catch (err) {
      console.error("Submit Error:", err);
      console.log(err.message || JSON.stringify(err));
      Swal.fire({
        title: "حدث خطأ أثناء إضافة اللوكيشن",
        icon: "error",
        timer:1500
      })
      setLoading(false);
    }
    setLoading(false);
        Swal.fire({
        title: "تم اضافة اللوكيشن بنجاح",
        icon: "success",
        timer: 1500,
      })

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

        <button
          type="submit"
          className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 cursor-pointer 
             hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 
             flex items-center justify-center gap-2 rounded-2xl">
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
