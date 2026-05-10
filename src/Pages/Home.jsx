import BackgroundImg from "../Components/BackgroundImg";
import ContentHome from "../Components/ContentHome";
import imgComp from "../assets/imgs/bg.jpg";

export default function Home() {
  
  return (
    <div className="">
      <BackgroundImg img={imgComp} details={"Welcome To Party Venue"} />
      <ContentHome />
    </div>
  );
}
