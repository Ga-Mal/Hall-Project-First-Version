import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/icons-logos/logo icon.png";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// import face from "../assets/imgs/icons-logos/facebook.svg";
// import google from "../assets/imgs/icons-logos/google.svg";

// password => 6450  /  service => 19765

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", formData.email)
      .single();

    if (!user) {
        Swal.fire({
        title: "البريد غير موجود ❌",
        text: `للاسف البريد الذي أدخلته غير موجود ممكن تجرب تاني او تسجل حساب جديد`,
        icon: "error",
        confirmButtonText: "حسناً",
      });
      setLoading(false);
      return;
    }
    
    // compare hashed passwords
    if (user.password !== formData.password) {
      Swal.fire({
        title: "كلمة المرور غير صحيحة ❌",
        text: `للاسف يا ${formData.clientName} كلمة المرور التي أدخلتها غير صحيحة. يرجى المحاولة مرة أخرى.`,
        icon: "error",
        confirmButtonText: "حسناً",
      });
      setLoading(false);
      return;
    }

    localStorage.setItem("session_token",JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );

    // Redirect based on role
    if (user) navigate("/");
    toast.success(`أهلا يا ${user.name.split(" ")[0]}, تم تسجيل دخولك بنجاح 🎉` , {duration: 3000});
    setLoading(false);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // 01064014580
    <div className="min-h-screen min-w-full mx-auto bg-(--color-hover) px-4 py-2 text-white">
      {/* CONTENT */}
      <div className="w-full max-w-[80%] mx-auto flex md:flex-row flex-col-reverse items-center gap-y-10 my-10 justify-between md:items-start">
        {/* RIGHT TITLE */}
        <div className="">
          <Link to="/"
            className="text-(--color-text-gold) font-bold text-lg hover:(--color-text-gold) cursor-pointer transition">
            الصفحة الرئيسية
          </Link>
          <span className="font-bold mx-2"> | </span>
          <Link to="/register"
            className="text-(--color-text-gold) font-bold text-lg hover:(--color-text-gold) cursor-pointer transition">
            انشاء حساب
          </Link>
        </div>
        {/* LOGO */}
        <div className="">
          <div className="flex items-center gap-2">
            <img loading="lazy" src={logo} className="rounded-full" />
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl w-full mx-auto max-w-md p-6 mt-10">
        <h2 className="text-center text-xl font-bold mb-2"> مرحبًا بك 👋</h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          سجّل الآن واستمتع باختيار قاعتك.
        </p>

        {/* FORM */}
        <form onSubmit={onSubmitLogin} className="space-y-4">
          {/* Email */}
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"/>

          {/* Password */}
          <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"/>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={`w-full p-3 transition rounded-lg text-black cursor-pointer font-bold
            ${loading ? "bg-yellow-400" : "bg-yellow-500 hover:bg-yellow-600"}`}>

            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                جاري الدخول...
              </div>
            ) : (
              "الدخول"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
