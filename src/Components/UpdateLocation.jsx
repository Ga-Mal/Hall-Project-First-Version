
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function UpdateLocation() {
  const { updatePhotographyID } = useParams();
  const navigate = useNavigate();
  const [headerImg, setHeaderImg] = useState("");
  const [galleryImgs, setGalleryImgs] = useState([]);
  const headerInputRef = useRef();
  const galleryInputRef = useRef();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "photography",
    address: "",
    hall_location: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  useEffect(() => {
    const fetchPhotography = async () => {
      try {
        const { data, error } = await supabase
          .from("locations")
          .select("*")
          .eq("id", updatePhotographyID)
          .single();

        if (error) {
          Swal.fire({
            title: "حصل خطأ أثناء جلب البيانات",
            text: error.message,
            icon: "error",
          });
          return;
        }

        setForm({
          title: data.title,
          price: data.price,
          category: data.category,
          address: data.address,
          location: data.location,
          phone: data.phone,
          whatsapp: data.whatsapp,
          description: data.description,
        });

        setHeaderImg(JSON.parse(data.header_img) || "");
        setGalleryImgs(JSON.parse(data.imgs) || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchPhotography();
  }, [updatePhotographyID]);

  // handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle header image
  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1920 };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => setHeaderImg(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Header image compression error:", err);
    }
  };

  // handle gallery images
  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1920 };
      const compressedImgs = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, options);
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      setGalleryImgs(compressedImgs);
    } catch (err) {
      console.error("Gallery images compression error:", err);
    }
  };

  // submit final data
  const submitLocation = async (e) => {
    e.preventDefault();

    try {

      const locationData = {
        title: form.title.trim(),
        price: Number(form.price),
        category: "photography",
        address: form.address.trim(),
        location: form.location.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
        header_img: JSON.stringify(headerImg),
        gallery_imgs: JSON.stringify(galleryImgs),
      };

      const { error } = await supabase
        .from("locations")
        .update(locationData)
        .eq("id", updatePhotographyID);

      if (error) {
        console.log(error);
        Swal.fire({
          title: "حدث خطأ أثناء التعديل",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "تم تحديث بيانات اللوكيشن بنجاح",
        icon: "success",
      }).then(() => {
        navigate("/photography", { replace: true });
      });
      setForm({
        title: "",
        price: "",
        category: "photography",
        address: "",
        location: "",
        phone: "",
        whatsapp: "",
        description: "",
      });
      setHeaderImg("");
      setGalleryImgs([]);
    } catch (err) {
      Swal.fire({
        title: "حدث خطأ أثناء إرسال البيانات",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={submitLocation}
      className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">تعديل اللوكيشن</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          value={form.title}
          name="title"
          placeholder="اسم اللوكيشن"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.price}
          name="price"
          placeholder="السعر"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.address}
          name="address"
          placeholder="العنوان"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          value={form.location}
          name="location"
          placeholder="الموقع"
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
          className="input"
          onChange={handleChange}
          required
        />

        <label className="font-semibold">صورة الهيدر:</label>
        <input
          ref={headerInputRef}
          type="file"
          accept="image/*"
          onChange={handleHeaderImg}
          className="input"
        />

        <label className="font-semibold">مجموعة الصور:</label>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImgs}
          className="input"
        />

        <button
          type="submit"
          className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500">
          تعديل البيانات
        </button>
      </div>
    </form>
  );
}
