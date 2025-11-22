import BackgroundImg from "../Components/BackgroundImg";
import ContentHome from "../Components/ContentHome";
import imgComp from "../assets/imgs/bg.png";

export default function Home() {
  
  return (
    <div className="">
      <BackgroundImg img={imgComp} details={"Welcome To Party Venue"} />
      <ContentHome />
    </div>
  );
}

// Ruesible Component 

// ظبط موضوع الصورة اللي في الكومبوننت
// حل مشكلة الاسكرول اللي ظهر في الكومبوننت ده
