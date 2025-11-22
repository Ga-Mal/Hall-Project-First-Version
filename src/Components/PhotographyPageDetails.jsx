import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import BackgroundImg from './BackgroundImg';
import { supabase } from '../utils/supabaseClient';

export default function PhotographyPageDetails() {
    const {photographyID} = useParams();
      const [photography, setPhotography] = useState(null);
    
      const fetchPhotography = async () => {
        try {
          const { data, error } = await supabase.from("locations").select("*").eq("id", photographyID).single();
          // console.log(data);
          
          if (error) {
            console.error("Error fetching:", error);
            return;
          }
    
          // parsing JSON fields
          const cleanedData = {
            ...data,
            gallery_imgs: data.gallery_imgs ? JSON.parse(data.gallery_imgs) : [],
            header_img: data.header_img ? JSON.parse(data.header_img) : "",
          };
          // console.log(cleanedData);
          
          setPhotography(cleanedData);
        } catch (err) {
          console.error("Fetch Error:", err);
        }
      };
    
      useEffect(() => {
        fetchPhotography();
      }, []);
    
      if (!photography) {
      return <p className="text-center my-20 py-10">جاري التحميل...</p>;
    }


  return (
    <div className="">
        <BackgroundImg img={photography.header_img} details={""} />
            <div className="w-[90%] mx-auto">
                <p className="text-3xl text-center font-semibold py-10 text-(--color-text-black)"> {photography.title} </p>
                <p className="text-2xl md:w-[50%] w-[90%] mx-auto text-center text-(--color-text-black)"> {photography.description} </p>
                <div className="m-10 md:flex flex-wrap justify-center gap-5">
                    {photography.gallery_imgs && photography.gallery_imgs.map((image,i) => (
                        <img loading="lazy" src={image} key={i} alt="img" className="md:w-[49%] mb-5" />
                    ))}
                </div>
                <div className="">
                    <div className="">
                        <p className="text-3xl my-10 font-bold text-(--color-text-black)">السعر {photography.price} جنية مصري</p>
                        <p className="text-3xl mb-10 font-semibold text-(--color-text-black)">معلومات التواصل</p>
                        <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">العنوان</span> {photography.address}</p>
                        <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">الموقع</span> {photography.location}</p>
                        <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">الهاتف</span> <span dir="ltr">{photography.phone}</span></p>
                        <p className="pb-5 text-(--color-text-black) text-[20px]"><span className="font-semibold ml-7">الواتساب</span> <span dir="ltr">{photography.whatsapp}</span></p>
                    </div>
                    <div className="w-full text-center"> <Link to={"reservation"} className="bg-(--color-text-gold) my-10 px-3 py-3 font-semibold rounded-2xl hover:bg-[#641888] text-2xl hover:text-(--color-text) duration-500 inline-block w-[20%]">حجز </Link> </div>
                </div>
            </div>
    </div>
    )
}
