import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import imgHeader from "../assets/imgs/halls.png";
import { useLocatoinsStore } from "../zustand/locationsStore";

export default function Locations() {
  const {locations} = useLocatoinsStore();

  return (
    <div className="">
      <BackgroundImg img={imgHeader} details="" />

      <div className="w-full">
        <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)">
         المصورين المتاحين في المنصة
        </p>

        <div className="md:w-[90%] sm:w-[98%] mx-auto flex flex-wrap gap-10 justify-center items-center">
          {locations.map((loc) => (
            <div key={loc.id} className="sm:w-full md:w-[40%] lg:w-[25%]">
              <CardStandard btnMassege="عرض المصور" details={loc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
