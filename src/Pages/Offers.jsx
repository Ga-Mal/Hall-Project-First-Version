import bgOffers from "../assets/imgs/offers.svg";
import BackgroundImg from "../Components/BackgroundImg";
// import CardStandard from "../Components/CardStandard";
import CardStandardForOffers from "../Components/CardStandardForOffers";
import {offersData} from "../store/dataStore" 

export default function Offers() {

  return (
    <div>
      <div className="">
        <BackgroundImg img={bgOffers} details={""} />
        <div className="w-full">
          {/* Cards Section */}
          <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)"> العروض المتاحة</p>
          <p className="text-2xl font-bold text-center py-5 text-(--color-text-black)"> عزيزي العميل , القاعات او اللوكيشن المصنفيين كعروض سيتم محاسبتك علي السعر المدرج في العرض وليس الموجود  </p>
          {/* Your Halls Cards Here */}
          <div className="md:w-[90%] sm:w-[98%] mx-auto flex flex-wrap gap-10 justify-center items-center">
            {/* Here Your Loop Of Data */}
            {offersData.map((offer,i) => (
              <div key={i} className="sm:w-full md:w-[40%] lg:w-[25%]">
                <CardStandardForOffers btnMassege={offer.category == "halls" ? "عرض القاعة" : "عرض اللوكيشن" } details={offer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
