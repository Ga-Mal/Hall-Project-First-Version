import { Link, useParams } from "react-router";
import BackgroundImg from "./BackgroundImg";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function HallPageDetails() {
  const { hallID } = useParams();
  const [hall, setHall] = useState(null);

  const fetchHall = async () => {
    try {
      const { data, error } = await supabase.from("halls").select("*").eq("id", hallID).single();
      
      if (error) {
        console.error("Error fetching:", error);
        return;
      }

      // async parsing JSON fields
      try{
        // if data data parsing successfuly > setHall
        const cleanedData = {
          ...data,
          imgs: data.imgs ? JSON.parse(data.imgs) : [],
          header_img: data.header_img ? JSON.parse(data.header_img) : "",
          extensions: data.extensions ? JSON.parse(data.extensions) : [],
        };
        setHall(cleanedData);

        // if not successfuly parsing > setHall with original data and log error
      }catch(error){
        setHall(data);
        console.log("Cannot parse JSON fields: ", error);
      }
      
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchHall();
  }, []);

  if (!hall) {
  return <p className="text-center my-20 py-10">جاري التحميل...</p>;
}
  
  return (
    <div className="">
      <BackgroundImg img={hall.header_img} details="" />

      <div className="w-[90%] mx-auto">
        <p className="text-3xl text-center font-semibold py-10 text-(--color-text-black)">
          {hall.title}
        </p>

        <p className="text-2xl mb-10 md:mb-0 md:w-[50%] w-[90%] mx-auto text-center text-(--color-text-black)">
          {hall.description}
        </p>

        <div className="md:m-10 m-2 md:flex flex-wrap justify-center gap-5">
          {hall.imgs &&
            hall.imgs.map((image, i) => (
              <img loading="lazy" src={image} key={i} alt="img" className="md:w-[48%] w-full mb-5" />
            ))}
        </div>

        <div>
          <div>
            <p className="text-3xl my-10 font-bold text-(--color-text-black)">السعر {hall.price} جنية مصري</p>
            <p className="text-3xl mb-10 font-semibold text-(--color-text-black)"> معلومات التواصل</p>
            <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">العنوان</span> {hall.address}</p>
            <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">الموقع</span> {hall.hall_location}</p>
            <p className="pb-5 text-(--color-text-black) text-[20px]">
              <span className="font-semibold ml-8">الهاتف</span>
              <span dir="ltr">{hall.phone}</span>
            </p>
            <p className="pb-5 text-(--color-text-black) text-[20px]">
              <span className="font-semibold ml-5">الواتساب</span>
              <span dir="ltr">{hall.whatsapp}</span>
            </p>
          </div>
          <p className="text-3xl font-semibold mb-7 text-(--color-text-black)">الاضافات</p>

          {hall.extensions && hall.extensions.map((ex, i) => (
              <div key={i} className="flex items-center justify-between w-full my-5" dir="rtl">
                <label className="flex items-center gap-3 text-[20px] cursor-pointer">
                  <span className="text-(--color-text-black)">{ex.name}</span>
                </label>
                <span className="text-(--color-text-black) text-[20px]">{ex.peaces} قطعة</span>
                <span className="text-(--color-text-black) text-[20px]"> سعر القطعة {ex.price} جنيه</span>
              </div>
            ))}

          <div className="w-full text-center">
            <Link to={"reservation"} className="bg-(--color-text-gold) my-10 px-3 py-3 font-semibold rounded-2xl hover:bg-[#641888] hover:text-(--color-text) duration-500 inline-block w-[80%] md:w-[40%]">
              اطلب القاعة
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
