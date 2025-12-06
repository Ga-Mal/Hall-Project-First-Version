// This Practice Is The Best For Performance
import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import bgImg from "../assets/imgs/halls.png";
import { useHallsStore } from "../zustand/hallsStore";

export default function Halls() {
  const { halls } = useHallsStore();


  return (
    <div>
      <BackgroundImg img={bgImg} details="" />
      <div className="w-full">
        <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)">
          القاعات
        </p>
        {halls.length === 0 && <h1 className="text-center my-20 py-10"> يتم جلب القاعات الان... </h1>}

        <div className="md:w-[90%] w-full mx-auto flex flex-wrap gap-10 justify-center items-center">
          {halls?.map((hall) => ( hall?.id && (
              <div key={hall.id} className="sm:w-full md:w-[40%] lg:w-[25%]">
                <CardStandard btnMassege="عرض القاعة" details={hall} />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

