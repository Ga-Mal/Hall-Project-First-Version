import { Link } from "react-router-dom";
import imageFunny from "../assets/imgs/funny.jpg";
import { getUserSession } from "../utils/getUserSession";

export default function NotFoundOrErrorPage() {
  const currentUser = getUserSession();
  const firstName =
    currentUser && (currentUser.role === "admin" || currentUser.role === "user")
      ? currentUser.name.split(" ")[0]
      : "";

  return (
    <div className="py-20"
      style={{height: "100vh",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",textAlign: "center",background: "var(--color-footer)"}}>
      <h1 className="text-(--color-text-gold) font-bold  text-2xl mt-15 mb-8">
        404!
      </h1>
      <p className="text-(--color-text-gold) pb-10">
       غلطت في العنوان او  حصلت مشكلة في السيرفر، بس ماتقلقش إحنا هنا عشان نساعدك ترجع للصفحة الرئيسية وتكمل تصفحك بسهولة.
      </p>

      <img loading="lazy" src={imageFunny} alt="Funny 404" className="md:w-[20%] w-[90%]" />

      <p style={{fontSize: "20px",fontWeight: "bold",marginTop: "20px",color: "var(--color-text-gold)",marginBottom: "30px"}}>
        {firstName ? ` ارجع ي ${firstName} وبطل لعب ف الزراير الصفحة مش موجودة دلوقتي وإتأكد إنك كتبت العنوان صح والنت عندك كويس عشان ماتجيش هنا تاني`
          : "ارجع وبطل لعب ف الزراير الصفحة مش موجودة دلوقتي وإتأكد إنك كتبت العنوان صح والنت عندك كويس عشان ماتجيش هنا تاني"}
      </p>

      <Link to="/" replace style={{padding: "12px 25px",background: "var(--color-hover)",color: "var(--color-text-light)",borderRadius: "10px",fontWeight: "bold",textDecoration: "none",transition: "0.3s"}}
        onMouseEnter={(e) => (e.target.style.background = "#8c1bb5")}
        onMouseLeave={(e) => (e.target.style.background = "var(--color-hover)")}>
        رجوع للصفحة الرئيسية
      </Link>
    </div>
  );
}
