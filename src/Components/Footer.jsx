import logo from "../assets/imgs/icons-logos/logo.png";
import tiktok from "../assets/imgs/icons-logos/TikTok.png";
import facbook from "../assets/imgs/icons-logos/facebook.png";
import instagram from "../assets/imgs/icons-logos/instgram.png";

export default function Footer() {
  return (
    <div>
      <div className="bg-(--color-footer) text-(--color-text-light) font-semibold  py-5 px-16">
        <div className="md:flex md:justify-between">
          {/* Media Icons and Logo (Right Footer) */}
          <section className="">
            <div className="py-7">
              <img loading="lazy" src={logo} alt="logoImg" className="mx-auto md:m-0"/>
            </div>
            <p className="text-center md:text-start">
              رؤيتنا هي توفير الراحة والمساعدة
            </p>
            <div className="py-5 flex justify-center">
              <a href="#">
                <img loading="lazy" src={tiktok} alt="tiktok icon" />
              </a>
              <a href="#">
                <img loading="lazy" src={instagram} alt="instagram icon" />
              </a>
              <a href="#">
                <img loading="lazy" src={facbook} alt="facebook icon" />
              </a>
            </div>
          </section>

          {/* Data Info (Left Footer) */}
          <section className="md:flex md:justify-center md:items-center md:gap-x-16 md:pl-40 my-5 text-center md:text-start ">
            <div className="firstRow">
              <h3 className="text-(--color-text-gold)">من نحن</h3>
              <p> <a href="#"> كيف يعمل </a> </p>
              <p> <a href="#"> مميزات</a> </p>
              <p> <a href="#"> الفريق القائم علي العمل</a> </p>
              <p> <a href="#"> الفريق القائم علي العمل علاقة تجارية</a> </p>
              <p> <a href="#"> علاقة تجارية</a> </p>
            </div>
            <div className="secondRow">
              <h3 className="text-(--color-text-gold)">مجتمع</h3>
              <p> <a href="#"> قاعات</a> </p>
              <p> <a href="#"> عروض</a> </p>
              <p> <a href="#"> لوكيشن تصوير</a> </p>
            </div>
            <div className="thiredRow">
              <h3 className="text-(--color-text-gold)">مجتمع</h3>
              <p> <a href="#"> انستجرام</a> </p>
              <p> <a href="#"> تيك توك</a> </p>
              <p> <a href="#"> فيسبوك</a> </p>
            </div>
          </section>
        </div>

        <hr className="text-(--color-text-gold) sm:my-5" />
        {/* End Footer */}
        <div className="md:flex md:justify-between p-5 text-center">
          <div className="">
            <p className="inline">جميع الحقوق محفوظة</p>©PartyVenue2025
          </div>

          <div className="sm:flex sm:col">
            <p>
              <a href="#" className="mx-5">
                سياسة الخصوصية
              </a>
            </p>
            <a href="#" className="">
              الشروط والاحكام
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
