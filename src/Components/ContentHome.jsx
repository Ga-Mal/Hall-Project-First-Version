import BackgroundImg from "./BackgroundImg";
import imgComp from "../assets/imgs/halls.png";
import loc from "../assets/imgs/loaction.png";
// import off2 from "../assets/imgs/venue-offer.png";
import Button from "./Button";
import ContactForm from "./ContactForm";

export default function ContentHome() {
  return (
    <div className="w-[90%] m-auto">
      <div className="">
        <div className="halls w-full m-auto">
          <div className="details flex justify-between items-center py-10 font-bold">
            <h2 className="text-2xl text-(--color-text-black) "> القاعات</h2>
            <Button text={"عرض الكل"} url={"/halls"} />
          </div>
          <div className="w-full">
            <BackgroundImg img={imgComp} />
          </div>
        </div>

        <div className="halls w-full m-auto">
          <div className="details flex justify-between items-center py-10 font-bold">
            <h2 className="text-2xl text-(--color-text-black)">
              لوكيشن تصوير
            </h2>
            <Button text={"عرض الكل"} url={"/photography"} />
          </div>
          <div className="w-full">
            <BackgroundImg img={loc} />
          </div>
        </div>
        {/* <div className="halls w-full m-auto">
          <div className="details flex justify-between items-center py-10 font-bold">
            <h2 className="text-2xl text-(--color-text-black)"> العروض</h2>
            <Button text={"عرض الكل"} url={"/offers"} />
          </div>
          <div className="w-full">
            <BackgroundImg img={off2} />
          </div>
        </div> */}

        {/* About */}
        <p className="text-3xl my-5 font-bold md:my-15 text-center">من نحن</p>
        <div className="text-2xl text-center w-full md:w-[90%] mx-auto my-5 md:my-10">
          نحن في PartyVenue نسعى لتسهيل تجربة الحجز لكل عميل يبحث عن مكان مثالي
          لحدثه الخاص. نوفر لك مجموعة متنوعة من القاعات وأماكن التصوير والخدمات
          المرتبطة، مع تفاصيل دقيقة وصور واضحة تساعدك على اتخاذ القرار بسهولة.
          هدفنا هو تقديم تجربة سلسة، سريعة، وموثوقة—من أول زيارة للموقع وحتى
          إتمام الحجز. نؤمن أن كل مناسبة تستحق الإهتمام الكامل، ولهذا نعمل
          دائمًا على تحسين خدماتنا، وتوفير أفضل الاختيارات بأسعار تنافسية وجودة
          عالية.
          <p> مع PartyVenue… اختيارك أسهل، وتجربتك أفضل.</p>
        </div>

        {/* Contact */}
        <p className="text-3xl font-bold my-5 md:my-15 text-center">تواصل معنا</p>
        <div className="">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
