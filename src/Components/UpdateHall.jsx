import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function UpdateHall() {
  const { updateHallID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [headerImg, setHeaderImg] = useState("");
  const [galleryImgs, setGalleryImgs] = useState([]);
  const headerInputRef = useRef();
  const galleryInputRef = useRef();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "halls",
    address: "",
    hall_location: "",
    phone: "",
    whatsapp: "",
    description: "",
    extensions: [{ name: "", peaces: 0, price: 0 }],
  });

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const { data, error } = await supabase
          .from("halls")
          .select("*")
          .eq("id", updateHallID)
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
          hall_location: data.hall_location,
          phone: data.phone,
          whatsapp: data.whatsapp,
          description: data.description,
          extensions: JSON.parse(data.extensions) || [
            { name: "", peaces: "", price: "0" },
          ],
        });

        setHeaderImg(JSON.parse(data.header_img) || "");
        setGalleryImgs(JSON.parse(data.imgs) || []);
      } catch (err) {
        Swal.fire({
          title: "حصل خطأ أثناء جلب البيانات",
          text: err.message,
          icon: "error",
        });
      }
    };

    fetchHall();
  }, [updateHallID]);

  // handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle header image
  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 5000 };
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
      const options = { maxSizeMB: 1, maxWidthOrHeight: 5000 };
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

  // add extension
  const addExtension = () => {
    setForm({
      ...form,
      extensions: [...form.extensions, { name: "", peaces: "", price: "" }],
    });
  };

  // extension change
  const handleExtensionChange = (i, e) => {
    const updated = [...form.extensions];
    updated[i][e.target.name] = e.target.value;
    setForm({ ...form, extensions: updated });
  };

  // submit final data
  const submitHall = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanedExtensions = form.extensions.filter((ext) => ext.name.trim() !== "").map((ext) => ({
          name: ext.name.trim(),
          peaces: Number(ext.peaces) || 0,
          price: Number(ext.price) || 0,
        }));

      const hallData = {
        title: form.title.trim(),
        price: Number(form.price),
        category: "halls",
        address: form.address.trim(),
        hall_location: form.hall_location.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
        extensions: JSON.stringify(cleanedExtensions),
        header_img: JSON.stringify(headerImg),
        imgs: JSON.stringify(galleryImgs),
      };

      const { error } = await supabase.from("halls").update(hallData).eq("id", updateHallID);

      if (error) {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "حدث خطأ أثناء التعديل",
          icon: "error",
        });
        return;
      }
      setLoading(false);
      Swal.fire({
        title: "تم تحديث بيانات القاعة بنجاح",
        icon: "success",
      }).then(() => {
        navigate("/halls", { replace: true });
      });
      setForm({
        title: "",
        price: "",
        category: "halls",
        address: "",
        hall_location: "",
        phone: "",
        whatsapp: "",
        description: "",
        extensions: [{ name: "", peaces: 0, price: 0 }],
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
    setLoading(false);
  };

  return (
    <form
      onSubmit={submitHall}
      className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">تعديل القاعة</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          value={form.title}
          name="title"
          placeholder="اسم القاعة"
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
          value={form.hall_location}
          name="hall_location"
          placeholder="Location"
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

        <div>
          <h3 className="font-semibold mb-2">الإضافات</h3>
          {form.extensions.map((ext, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                value={ext.name}
                name="name"
                placeholder="Name"
                className="input"
                onChange={(e) => handleExtensionChange(i, e)}
              />
              <input
                value={ext.peaces}
                name="peaces"
                placeholder="Peaces"
                className="input"
                onChange={(e) => handleExtensionChange(i, e)}
              />
              <input
                value={ext.price}
                name="price"
                placeholder="Price"
                className="input"
                onChange={(e) => handleExtensionChange(i, e)}
              />
            </div>
          ))}

          <button
            onClick={addExtension}
            type="button"
            className="px-3 py-1 bg-(--color-text-gold) hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500 rounded-2xl cursor-pointer">
            إضافة جديدة
          </button>
        </div>

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
