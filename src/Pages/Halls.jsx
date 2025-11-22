// This Practice Is The Best For Performance
import { useEffect, useState, useCallback } from "react";
import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import bgImg from "../assets/imgs/halls.png";
import { supabase } from "../utils/supabaseClient";

export default function Halls() {
  const [halls, setHalls] = useState([]);

  // Promise-based Image Loader
  const loadImage = useCallback((url) => {
    return new Promise((resolve) => {
      if (!url) return resolve("");
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve("");
    });
  }, []);

  // Fetch Halls
  const fetchHalls = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("halls").select("id, title, price, description, header_img");

      if (error) throw error;

      // Clean Data
      const cleaned = data.map((item) => {
        let img = "";
        try {
          img = item.header_img ? JSON.parse(item.header_img) : "";
        } catch {
          img = "";
        }

        return { ...item, header_img: img };
      });

      // Cache
      localStorage.setItem("hallsData", JSON.stringify(cleaned));

      // Load Images
      const withImages = await Promise.all(
        cleaned.map(async (hall) => ({
          ...hall,
          header_img: await loadImage(hall.header_img),
        }))
      );

      setHalls(withImages);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, [loadImage]);

  useEffect(() => {
    const stored = localStorage.getItem("hallsData");

    if (stored) {
      setHalls(JSON.parse(stored));
      // نجيب تحديث جديد في الخلفية بدون ما نعمل re-render تاني
      fetchHalls();
    } else {
      fetchHalls();
    }
  }, [fetchHalls]);

  return (
    <div>
      <BackgroundImg img={bgImg} details="" />

      <div className="w-full">
        <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)">
          القاعات
        </p>

        <div className="md:w-[90%] w-full mx-auto flex flex-wrap gap-10 justify-center items-center">
          {halls.map((hall) => (
            <div key={hall.id} className="sm:w-full md:w-[40%] lg:w-[25%]">
              <CardStandard btnMassege="عرض القاعة" details={hall} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------- Previous Version -------

// import { useEffect, useState } from "react";
// import BackgroundImg from "../Components/BackgroundImg";
// import CardStandard from "../Components/CardStandard";
// import bgImg from "../assets/imgs/halls.png";
// import { supabase } from "../utils/supabaseClient";

// export default function Halls() {
//   const [halls, setHalls] = useState([]);
//   // fetch halls data and save it in localStorage without img to speed up loading
//   const fetchHalls = async () => {
//     try {

//       const { data, error } = await supabase.from("halls").select("id, title, price, description, header_img");

//       if (error) {
//         console.error("Error fetching:", error);
//         return;
//       }

//       const imgData = data.map((item) => ({...item,
//         header_img: item.header_img ? JSON.parse(item.header_img) : "",
//       }));

//       localStorage.setItem("hallsData", JSON.stringify(imgData));

//       // استدعاء الصور بشكل منفصل
//       const hallsWithImages = await Promise.all(
//         imgData.map(async (hall) => {
//           return {
//             ...hall,
//             header_img: await loadImage(hall.header_img),
//           };
//         })
//       );

//       setHalls(hallsWithImages);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   // دالة لتحميل الصور كـ Promise
//   const loadImage = (url) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.src = url;
//       img.onload = () => resolve(url);
//       img.onerror = () => resolve("");
//     });
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem("hallsData");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setHalls(parsedData);
//     }

//     fetchHalls();
//   }, []);

//   return (
//     <div className="">
//       <BackgroundImg img={bgImg} details={""} />

//       <div className="w-full">
//         {/* Cards Section */}
//         <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)">
//           القاعات
//         </p>
//         {/* Your Halls Cards Here */}
//         <div className="md:w-[90%] sm:w-[98%] mx-auto flex flex-wrap gap-10 justify-center items-center">
//           {/* Here Your Loop Of Data */}
//           {halls.map((hall) => (
//             <div key={hall.id} className="sm:w-full md:w-[40%] lg:w-[25%]">
//               <CardStandard btnMassege={"عرض القاعة"} details={hall} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
