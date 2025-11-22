import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/icons-logos/logo icon.png";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";
// import face from "../assets/imgs/icons-logos/facebook.svg";
// import google from "../assets/imgs/icons-logos/google.svg";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    
    if(formData.name.length < 3){
      setLoading(false);
      Swal.fire({
        title: "الاسم قصير جدًا ❌",
        text: `يجب أن يكون الاسم على الأقل 3 أحرف.`,
        icon: "error",
        confirmButtonText: "تمام",
      });
      return;
    }
    // if (!pattern.test(email)) return false > Invalid email format
    if(!/\S+@\S+\.\S+/.test(formData.email)){
      setLoading(false);
      Swal.fire({
        title: "البريد الإلكتروني غير صالح ❌",
        text: `يرجى إدخال بريد إلكتروني صحيح.`,
        icon: "error",
        confirmButtonText: "تمام",
      });
      return;
    }
    // Validate phone number (simple regex for digits only, length between 7 to 15)
    if(!/^[\d]{7,15}$/.test(formData.phone)){ 
      setLoading(false);
      Swal.fire({
        title: "رقم الهاتف غير صالح ❌",
        text: `يرجى إدخال رقم هاتف صحيح يتكون من 7 إلى 15 رقمًا.`,
        icon: "error",
        confirmButtonText: "تمام",
      });
      return;
    }
    if(formData.password.length < 8){
      setLoading(false);
      Swal.fire({
        title: "كلمة المرور قصيرة جدًا ❌",
        text: `يجب أن تكون كلمة المرور على الأقل 8 أحرف.`,
        icon: "error",
        confirmButtonText: "تمام",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      Swal.fire({
        title: "كلمة المرور غير متطابقة ❌",
        text: `للاسف كلمة المرور التي أدخلتها غير متطابقة. لازم الاتنين يكونوا متطابقين.`,
        icon: "error",
        confirmButtonText: "حسناً",
      });
      return;
    }
    if(!formData.name || !formData.email || !formData.password || !formData.phone){
      setLoading(false);
      Swal.fire({
        title: "جميع الحقول مطلوبة ❌",
        text: `يرجى ملء جميع الحقول قبل التسجيل.`,
        icon: "error",
        confirmButtonText: "حسناً",
      });
      return;
    }
    


    // check existing email
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", formData.email)
      .single();

    if (existingUser) {
      setLoading(false);
      Swal.fire({
        title: "البريد مسجل بالفعل ❌",
        text: `للاسف البريد الذي أدخلته مسجل بالفعل. يرجى تغيير البريد أو تسجيل الدخول.`,
        icon: "error",
        confirmButtonText: "تمام",
      });
      setLoading(false);
      return;
  }

  // insert new user
  const { data, error } = await supabase.from("users").insert([
    {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: "user",
    },
  ]);

  if (error) {
    Swal.fire({
      title: "خطأ في التسجيل ❌",
      text: "حصل خطأ اثناء انشاء الحساب , ممكن تجرب تاني 😊",
      icon: "error",
      confirmButtonText: "تمام",
    });
    return;
  }

  setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phone: "",
  })
  setLoading(false);
  navigate("/login");
};




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen min-w-full mx-auto bg-(--color-hover) px-4 py-2 text-white">
      {/* Content */}
      <div className="w-full max-w-[80%] mx-auto flex md:flex-row flex-col-reverse items-center gap-y-10 my-10 justify-between md:items-start">
        {/* Right Title */}
        <div className="">
          <Link to="/home" className="text-(--color-text-gold) font-bold text-lg hover:(--color-text-gold) cursor-pointer transition">
             الصفحة الرئيسية
          </Link>
        <span className="font-bold mx-2"> | </span>
        <Link to="/login" className="text-(--color-text-gold) font-bold text-lg hover:(--color-text-gold) cursor-pointer transition">
         تسجيل الدخول
        </Link>
        </div>
        {/* Logo + Title */}
        <div className="">
          <div className="flex items-center gap-2">
            <img loading="lazy" src={logo} className="rounded-full"/>
          </div>
        </div>

      </div>

      {/* FORM CARD */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl w-full mx-auto max-w-md p-6 mt-5">
        <h2 className="text-center text-xl font-bold mb-2"> مرحبًا بك 👋</h2>
        <p className="text-center text-sm text-gray-200 mb-6">
          سجّل الآن واستمتع باختيار قاعتك.
        </p>

        {/* FORM */}
        <form className="space-y-4" onSubmit={onSubmitRegister}>
          <input type="text" name="name" placeholder="الاسم بالكامل" value={formData.name} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
          />

          <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
          />

          <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
          />

          <input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" value={formData.confirmPassword} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
          />

          <div className="flex gap-2">
            {/* <select name="country" value={formData.country} onChange={handleChange}
              className=" p-3 rounded-lg bg-white/20 text-white focus:outline-none">
              <option value="+20" className="text-black"> +20 </option>
              <option value="+966" className="text-black"> +966 </option>
              <option value="+971" className="text-black"> +971 </option>
            </select> */}

            <input type="text" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={`w-full p-3 transition rounded-lg text-black cursor-pointer font-bold
            ${loading ? "bg-yellow-400" : "bg-yellow-500 hover:bg-yellow-600"}`}>

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
        {/* <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-sm">أو</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div> */}

        {/* Login with Google */}
        {/* <button className="w-full cursor-pointer bg-white text-black p-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition">
          <img src={google} className="w-5" />
          تسجيل الدخول عبر جوجل
        </button> */}

        {/* Facebook */}
        {/* <button className="mt-3 w-full cursor-pointer bg-white text-black p-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition">
          <img src={face} className="w-5"/>
          تسجيل الدخول عبر الفيسبوك
        </button> */}
      </div>
    </div>
  );
}
