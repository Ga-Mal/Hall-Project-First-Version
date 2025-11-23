import { useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

export default function AddHall() {
  const headerInputRef = useRef();
  const galleryInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [headerImg, setHeaderImg] = useState("");
  const [galleryImgs, setGalleryImgs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "halls",
    address: "",
    hall_location: "",
    phone: "",
    whatsapp: "",
    description: "",
    extensions: [{ name: "", peaces: "", price: "" }],
  });

  // handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------

  // storage optimization without compression
  // const handleHeaderImg = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => setHeaderImg(reader.result);
  //   reader.readAsDataURL(file);
  // };

  //  Storage optimization with image compression
  const handleHeaderImg = async (e) => {
    const file = e.target.files[0];
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 5000,
        useWebWorker: true,
      };
      // Compress the image file
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => setHeaderImg(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Header image compression error:", err);
    }
  };
  // --------------------------------

  // multiple imgs Base64
  // const handleGalleryImgs = (e) => {
  //   const files = Array.from(e.target.files);
  //   Promise.all(
  //     files.map(
  //       (file) =>
  //         new Promise((resolve) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => resolve(reader.result);
  //           reader.readAsDataURL(file);
  //         })
  //     )
  //   ).then((imgs) => setImgs(imgs));
  // };

  // Storage optimization with image compression
  const handleGalleryImgs = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 5000,
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

  // -------------------------------

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
      // clean extensions
      const cleanedExtensions = form.extensions
        .filter((ext) => ext.name && ext.name.trim() !== "")
        .map((ext) => ({
          name: ext.name.trim(),
          peaces: Number(ext.peaces) || 0,
          price: Number(ext.price) || 0,
        }));

      // convert to JSON strings
      const extensionsToString = JSON.stringify(cleanedExtensions);
      const headerImgToString = JSON.stringify(headerImg);
      const galleryImgsToString = JSON.stringify(galleryImgs);

      const hallData = {
        title: form.title.trim(),
        price: Number(form.price) || 0,
        category: "halls",
        address: form.address.trim(),
        hall_location: form.hall_location.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        description: form.description.trim(),
        extensions: extensionsToString,
        header_img: headerImgToString,
        imgs: galleryImgsToString,
      };
      console.log("Final Hall Data To Send:", hallData);
      const { error } = await supabase.from("halls").insert([hallData]);

      if (!error) {
        // إعادة ضبط الفورم
        setForm({
          title: "",
          price: "",
          category: "halls",
          address: "",
          hall_location: "",
          phone: "",
          whatsapp: "",
          description: "",
          extensions: [{ name: "", peaces: "", price: "" }],
        });

        // إعادة ضبط الصور
        setHeaderImg("");
        setGalleryImgs([]);

        // إعادة ضبط Inputs من DOM
        if (headerInputRef.current) headerInputRef.current.value = "";
        if (galleryInputRef.current) galleryInputRef.current.value = "";

        Swal.fire({
          icon: "success",
          title: "تم اضافة القاعة بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
      } else {

        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "حدث خطأ اثناء اضافة القاعة",
          showConfirmButton: true,
          timer: 1500,
        });   
      }
    } catch (err) {
      setLoading(false);
      console.error("Error submitting hall:", err);
      console.log(err.message || JSON.stringify(err));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={submitHall}
      className="nav p-6 mt-2 w-[80%] mx-auto bg-(--color-hover) backdrop-blur-xl shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">إضافة قاعة جديدة</h1>

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

        {/* Header image */}
        <label className="font-semibold">صورة الهيدر:</label>
        <input
          ref={headerInputRef}
          type="file"
          accept="image/*"
          onChange={handleHeaderImg}
          className="input"
          required
        />

        {/* Gallery images */}
        <label className="font-semibold">مجموعة الصور:</label>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImgs}
          className="input"
          required
        />

        {/* Extensions */}
        <div>
          <h3 className="font-semibold mb-2">الإضافات</h3>
          {form.extensions.map((ext, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                name="name"
                value={form.extensions[i].name}
                placeholder="Name"
                className="input"
                onChange={(e) => handleExtensionChange(i, e)}
              />
              <input
                name="peaces"
                value={form.extensions[i].peaces}
                placeholder="Peaces"
                className="input"
                onChange={(e) => handleExtensionChange(i, e)}
              />
              <input
                name="price"
                value={form.extensions[i].price}
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
