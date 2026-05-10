import BackgroundImg from "./BackgroundImg";
import imgComp from "../assets/imgs/halls.jpg";
import loc from "../assets/imgs/locations.jpg";
import Button from "./Button";
import ContactForm from "./ContactForm";

export default function ContentHome() {
  return (
    <div className="w-[90%] m-auto">
      <div className="">
        <div className="halls w-full m-auto">
          <div className="details flex justify-between items-center py-10 font-bold">
            <h2 className="text-2xl text-(--color-text-black) "> القاعات</h2>
            <Button text={"عرض القاعات"} url={"/halls"} />
          </div>
          <div className="w-full">
            <BackgroundImg img={imgComp} />
          </div>
        </div>

        <div className="halls w-full m-auto">
          <div className="details flex justify-between items-center py-10 font-bold">
            <h2 className="text-2xl text-(--color-text-black)">المصورين</h2>
            <Button text={"عرض المصورين"} url={"/photography"} />
          </div>
          <div className="w-full">
            <BackgroundImg img={loc} />
          </div>
        </div>

        {/* About Section */}
        <section className="py-16 px-6 max-w-[1400px] mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* الجزء النصي */}
            <div className="w-full md:w-1/2 text-right">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-(--color-text-gold) drop-shadow-sm">
                من نحن
              </h2>
              <div className="space-y-6 text-xl md:text-2xl text-gray-700 leading-relaxed">
                <p>
                  في <span className="font-bold text-purple-700">PartyVenue </span> 
                  نحن لا نوفر مجرد مساحات نحن نمهد الطريق لذكريات لا تُنسى 
                  انطلقنا برؤية واضحة لتغيير مفهوم حجز المناسبات في مصر لنحولها
                  من رحلة بحث مرهقة إلى تجربة رقمية ممتعة وبسيطة.
                </p>
                <p>
                  نحن حلقة الوصل بينك وبين أجمل القاعات وأمهر المصورين حيث نجمع
                  لك كل التفاصيل التي تحتاجها من أسعار، مواقع، وصور حقيقية في
                  مكان واحد، لنضمن لك اتخاذ قرارك بكل ثقة وراحة بال
                </p>
                <div className="pt-2 border-r-4 border-(--color-text-gold) pr-4">
                  <p className=" text-purple-700">
                    "مع PartyVenue… اختيارك أسهل، وتجربتك أفضل"
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-yellow-400">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000"
                  alt="About PartyVenue"
                  className="w-full h-[400px] object-cover hover:scale-105 duration-700"
                />
              </div>
  
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-purple-700 rounded-2xl z-0 opacity-30"></div>
            </div>
          </div>

          {/* مميزاتنا - Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "دقة التفاصيل",
                desc: "صور حقيقية ومعلومات محدثة لكل قاعة ومصور.",
                icon: "🎯",
              },
              {
                title: "سهولة الحجز",
                desc: "خطوات بسيطة وسريعة لتأكيد مكانك في دقائق.",
                icon: "⚡",
              },
              {
                title: "أسعار تنافسية",
                desc: "نضمن لك أفضل العروض والخصومات الحصرية.",
                icon: "💰",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-purple-700/10 backdrop-blur-lg p-8 rounded-2xl border border-purple-700 hover:border-(--color-text-gold)/50 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-purple-900 text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <p className="text-3xl font-bold my-5 md:my-15 text-center">
          تواصل معنا
        </p>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
