import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocatoinsStore } from "../zustand/locationsStore";
import toast from "react-hot-toast";

export default function UpdateLocation() {
  const { updatePhotographyID } = useParams();
  const navigate = useNavigate();
  const { getLocationById , updateLocation , loading } = useLocatoinsStore();
  const location = getLocationById(Number(updatePhotographyID));
  const [headerImg, setHeaderImg] = useState(null);
  const [galleryImgs, setGalleryImgs] = useState([]);
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
    if (!location) return;

    setForm({
      title: location.title,
      price: location.price,
      category: location.category,
      address: location.address,
      phone: location.phone,
      whatsapp: location.whatsapp,
      description: location.description,
    });
  }, [updatePhotographyID]);

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
        address: form.address.trim(),
        // location: form.location.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
        header_img: headerImg,
        gallery_imgs: galleryImgs,
      };

      await updateLocation(location.id, payload , headerImg, galleryImgs);
      toast.success("تم تعديل اللوكيشن بنجاح ✅", { duration: 3000 });
      navigate(-1);

    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء تعديل اللوكيشن ❌", { duration: 3000 });
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

        {/* <input
          value={form.location}
          name="location"
          placeholder="الموقع"
          className="input"
          onChange={handleChange}
          required
        /> */}

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
          type="file"
          accept="image/*"
          onChange={handleHeaderImg}
          className="input"
        />

        <label className="font-semibold">مجموعة الصور:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImgs}
          className="input"
        />

        <button
          type="submit"
          className="w-[50%] mx-auto bg-(--color-text-gold) px-3 py-1.5 cursor-pointer 
             hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 
             flex items-center justify-center gap-2 rounded-2xl">
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
