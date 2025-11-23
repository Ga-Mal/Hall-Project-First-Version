import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import imgHeader from "../assets/imgs/halls.png";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  // تحميل الصور بطريقة آمنة
  const loadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve("");
    });
  };

  // fetch locations بدون الصور (أسرع)
  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select(
          "id, title, price, description, header_img"
        );

      if (error) {
        console.error("Error fetching locations:", error);
        return;
      }

      // تحويل JSON string للصورة
      const cleaned = data.map((item) => ({
        ...item,
        header_img: item.header_img ? JSON.parse(item.header_img) : "",
      }));

      // حفظ البيانات السريعة بدون الصورة
      localStorage.setItem("locationsData", JSON.stringify(cleaned));

      // تحميل الصور بعدين في الخلفية
      const withImages = await Promise.all(
        cleaned.map(async (loc) => ({
          ...loc,
          header_img: await loadImage(loc.header_img),
        }))
      );

      setLocations(withImages);
    } catch (err) {
      console.error("Locations Fetch Error:", err);
    }
  };

  // استرجاع + تحديث
  useEffect(() => {
    const stored = localStorage.getItem("locationsData");
    if (stored) {
      setLocations(JSON.parse(stored)); // عرض سريع
    }

    fetchLocations(); // تحديث + تحميل الصور
  }, []);

  return (
    <div className="">
      <BackgroundImg img={imgHeader} details="" />

      <div className="w-full">
        <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)">
          لوكيشن تصوير
        </p>

        <div className="md:w-[90%] sm:w-[98%] mx-auto flex flex-wrap gap-10 justify-center items-center">
          {locations.map((loc) => (
            <div key={loc.id} className="sm:w-full md:w-[40%] lg:w-[25%]">
              <CardStandard btnMassege="عرض اللوكيشن" details={loc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
