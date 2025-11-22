import imageFunny from "../assets/imgs/funny.jpg";
import { getUserSession } from "../utils/getUserSession";
export default function NotFoundOrErrorPage() {
  const currentUser = getUserSession();
  const firstName =
    currentUser && (currentUser.role === "admin" || currentUser.role === "user")
      ? currentUser.name.split(" ")[0]
      : "";

  return (
    <div
      style={{height: "100vh",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",textAlign: "center",background: "var(--color-footer)"}}>
      <h1 className="text-(--color-text-gold) text-2xl my-10">
        404!
      </h1>
      <p className="text-(--color-text-gold) pb-10">
        انت ايه اللي جابك هنا
      </p>

      <img loading="lazy" src={imageFunny} alt="Funny 404" className="md:w-[20%] w-[90%]" />

      <p style={{fontSize: "20px",fontWeight: "bold",marginTop: "20px",color: "var(--color-text-gold)",marginBottom: "30px"}}>
        {firstName ? ` ارجع ي ${firstName} وبطل لعب ف الزراير الصفحة مش موجودة دلوقتي وإتأكد إنك كتبت العنوان صح والنت عندك كويس عشان ماتجيش هنا تاني`
          : "ارجع وبطل لعب ف الزراير الصفحة مش موجودة دلوقتي وإتأكد إنك كتبت العنوان صح والنت عندك كويس عشان ماتجيش هنا تاني"}
      </p>

      <a href="/" style={{padding: "12px 25px",background: "var(--color-hover)",color: "var(--color-text-light)",borderRadius: "10px",fontWeight: "bold",textDecoration: "none",transition: "0.3s"}}
        onMouseEnter={(e) => (e.target.style.background = "#8c1bb5")}
        onMouseLeave={(e) =>
          (e.target.style.background = "var(--color-hover)")
        }>
        رجوع للصفحة الرئيسية
      </a>
    </div>
  );
}
