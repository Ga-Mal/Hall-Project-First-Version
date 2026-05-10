import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/icons-logos/logo icon.png";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// لو بتستخدم lucide-react أو font-awesome للأيقونات
import { Eye, EyeOff } from "lucide-react"; 

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // حالة إظهار الباسورد
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", formData.email)
        .single();

      if (error || !user) {
        Swal.fire({
          title: "البريد غير موجود ❌",
          text: `للأسف البريد الذي أدخلته غير موجود، يمكنك المحاولة مرة أخرى أو تسجيل حساب جديد.`,
          icon: "error",
          confirmButtonText: "حسناً",
        });
        return; // سيتم استدعاء setLoading(false) في الـ finally
      }

      if (user.password !== formData.password) {
        Swal.fire({
          title: "كلمة المرور غير صحيحة ❌",
          text: `للأسف يا ${user.name} كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.`,
          icon: "error",
          confirmButtonText: "حسناً",
        });
        return;
      }

      localStorage.setItem("session_token", JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      }));

      toast.success(`أهلاً يا ${user.name.split(" ")[0]}, تم تسجيل دخولك بنجاح 🎉`, { duration: 3000 });
      navigate("/");
      
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ ما، حاول لاحقاً");
    } finally {
      setLoading(false); // دي بتضمن إن الـ loader يقف في كل الحالات
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen min-w-full mx-auto bg-(--color-hover) px-4 py-2 text-white font-['Cairo']">
      {/* HEADER */}
      <div className="w-full max-w-[80%] mx-auto flex md:flex-row flex-col-reverse items-center gap-y-10 my-10 justify-between md:items-start">
        <div>
          <Link to="/" className="text-(--color-text-gold) font-bold text-lg hover:brightness-110 transition">
            الصفحة الرئيسية
          </Link>
          <span className="font-bold mx-2"> | </span>
          <Link to="/register" className="text-(--color-text-gold) font-bold text-lg hover:brightness-110 transition">
            إنشاء حساب
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <img loading="lazy" src={logo} className="rounded-full w-16 h-16 object-contain" alt="Logo" />
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl w-full mx-auto max-w-md p-6 mt-10">
        <h2 className="text-center text-xl font-bold mb-2"> مرحبًا بك 👋</h2>
        <p className="text-center text-sm text-gray-200 mb-6">سجّل الآن واستمتع باختيار قاعتك.</p>

        <form onSubmit={onSubmitLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            required
          />

          {/* Password with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 transition rounded-lg text-black font-bold flex items-center justify-center gap-2
              ${loading ? "bg-yellow-600 cursor-not-allowed opacity-80" : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"}`}
          >
            {loading ? (
              <>
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                جاري الدخول...
              </>
            ) : (
              "الدخول"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}