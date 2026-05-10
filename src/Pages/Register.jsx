import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/icons-logos/logo icon.png";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
import face from "../assets/imgs/icons-logos/facebook.svg";
import google from "../assets/imgs/icons-logos/google.svg";
import { Eye, EyeOff } from "lucide-react"; // استيراد أيقونات العين

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // حالة إظهار الباسورد
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    
    // Validations
    if(formData.name.length < 3){
      Swal.fire({ title: "الاسم قصير جدًا ❌", text: `يجب أن يكون الاسم على الأقل 3 أحرف.`, icon: "error", confirmButtonText: "تمام" });
      return;
    }
    if(!/\S+@\S+\.\S+/.test(formData.email)){
      Swal.fire({ title: "البريد الإلكتروني غير صالح ❌", text: `يرجى إدخال بريد إلكتروني صحيح.`, icon: "error", confirmButtonText: "تمام" });
      return;
    }
    if(!/^[\d]{7,15}$/.test(formData.phone)){ 
      Swal.fire({ title: "رقم الهاتف غير صالح ❌", text: `يرجى إدخال رقم هاتف صحيح يتكون من 7 إلى 15 رقمًا.`, icon: "error", confirmButtonText: "تمام" });
      return;
    }
    if(formData.password.length < 8){
      Swal.fire({ title: "كلمة المرور قصيرة جدًا ❌", text: `يجب أن تكون كلمة المرور على الأقل 8 أحرف.`, icon: "error", confirmButtonText: "تمام" });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({ title: "كلمة المرور غير متطابقة ❌", text: `للاسف كلمة المرور التي أدخلتها غير متطابقة. لازم الاتنين يكونوا متطابقين.`, icon: "error", confirmButtonText: "حسناً" });
      return;
    }

    setLoading(true);

    try {
      // check existing email
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", formData.email)
        .single();

      if (existingUser) {
        Swal.fire({ title: "البريد مسجل بالفعل ❌", text: `للاسف البريد الذي أدخلته مسجل بالفعل. يرجى تغيير البريد أو تسجيل الدخول.`, icon: "error", confirmButtonText: "تمام" });
        setLoading(false);
        return;
      }

      // insert new user
      const { error } = await supabase.from("users").insert([
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: "user",
        },
      ]);

      if (error) throw error;

      setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
      navigate("/login");
      
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ title: "خطأ في التسجيل ❌", text: "حصل خطأ اثناء انشاء الحساب , ممكن تجرب تاني 😊", icon: "error", confirmButtonText: "تمام" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen min-w-full mx-auto bg-(--color-hover) px-4 py-2 text-white font-['Cairo']">
      {/* Content */}
      <div className="w-full max-w-[80%] mx-auto flex md:flex-row flex-col-reverse items-center gap-y-10 my-10 justify-between md:items-start">
        {/* Right Title */}
        <div className="">
          <Link to="/" className="text-(--color-text-gold) font-bold text-lg hover:brightness-110 transition cursor-pointer">
              الصفحة الرئيسية
          </Link>
        <span className="font-bold mx-2"> | </span>
        <Link to="/login" className="text-(--color-text-gold) font-bold text-lg hover:brightness-110 transition cursor-pointer">
          تسجيل الدخول
        </Link>
        </div>
        {/* Logo + Title */}
        <div className="">
          <div className="flex items-center gap-2">
            <img loading="lazy" src={logo} className="rounded-full w-16 h-16 object-contain" alt="logo"/>
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white/10 backdrop-blur-lg border mb-10 border-white/20 shadow-xl rounded-2xl w-full mx-auto max-w-md p-6 mt-5">
        <h2 className="text-center text-xl font-bold mb-2"> مرحبًا بك 👋</h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          سجّل الآن واستمتع باختيار قاعتك.
        </p>

        {/* FORM */}
        <form className="space-y-4" onSubmit={onSubmitRegister}>
          <input type="text" name="name" placeholder="الاسم بالكامل" value={formData.name} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none" required
          />

          <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none" required
          />

          {/* Password with Eye Icon */}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none" required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition cursor-pointer">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password with Eye Icon */}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="تأكيد كلمة المرور" value={formData.confirmPassword} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none" required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition cursor-pointer">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex gap-2">
            <input type="tel" dir="rtl" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none" required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={`w-full p-3 transition rounded-lg text-black cursor-pointer font-bold
            ${loading ? "bg-yellow-400 opacity-80 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}>

            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                جاري إنشاء الحساب...
              </div>
            ) : (
              "تسجيل حساب جديد"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-sm">أو</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Login with Google */}
        <button disabled={loading} className="w-full cursor-pointer bg-white text-black p-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition">
          <img src={google} className="w-5" alt="google" />
          تسجيل الدخول عبر جوجل
        </button>

        {/* Facebook */}
        <button disabled={loading} className="mt-3 w-full cursor-pointer bg-white text-black p-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition">
          <img src={face} className="w-5" alt="facebook" />
          تسجيل الدخول عبر الفيسبوك
        </button>
      </div>
    </div>
  );
}