import { useState } from "react";
import DropDownArrow from "../utilities/DropDownArrow";
import { supabase } from "../lib/supabaseClient";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullname: "",
    grade: "",
    phone: "",
    parentPhone: "",
    gender: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const gradesOptions = [
    { value: "", label: "اختر الصف" },
    { value: "senior1", label: "الصف الأول الثانوي" },
    { value: "senior2", label: "الصف الثاني الثانوي" },
    { value: "senior3", label: "الصف الثالث الثانوي" },
  ];

  const genders = [
    { value: "", label: "اختر الجنس" },
    { value: "male", label: "ذكر" },
    { value: "female", label: "أنثى" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation logic
  const validate = () => {
    const errs = {};
    if (!form.fullname.trim()) errs.fullname = "الاسم الكامل مطلوب";
    if (!form.grade) errs.grade = "الصف الدراسي مطلوب";
    if (!form.phone.match(/^\d{10,15}$/)) errs.phone = "رقم هاتف غير صالح";
    if (!form.parentPhone.match(/^\d{10,15}$/))
      errs.parentPhone = "رقم هاتف ولي الأمر غير صالح";
    if (!form.gender) errs.gender = "اختر الجنس";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "البريد الإلكتروني غير صالح";
    if (form.password.length < 8)
      errs.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (form.passwordConfirm !== form.password)
      errs.passwordConfirm = "كلمة المرور غير متطابقة";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
      // Step 1: Sign up user in Auth
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullname,
            grade: form.grade,
            phone: form.phone,
            parentPhone: form.parentPhone,
            gender: form.gender,
            role: "student",
            is_active:true
          },
        },
      });

      if (signupError) throw signupError;

      const userId = signupData?.user?.id;
      if (!userId) throw new Error("لم يتم إنشاء الحساب بشكل صحيح.");

      // Step 2: Insert student record in database
      const { error: insertٍStudentError } = await supabase.from("students").insert(
        {
          id: userId,
          full_name: form.fullname,
          grade: form.grade,
          phone: form.phone,
          parent_phone: form.parentPhone,
          gender: form.gender,
          email: form.email,
          is_active:true
        },
      ).single();

      if (insertٍStudentError) throw insertٍStudentError;


      const { error: insertٍProfileError } = await supabase.from("profiles").insert(
        {
          id: userId,
          full_name: form.fullname,
          grade: form.grade,
          phone: form.phone,
          parent_phone: form.parentPhone,
          gender: form.gender,
          email: form.email,
          role:"student",
          is_active:true
        },
      ).single();

      if (insertٍProfileError) throw insertٍProfileError;

      toast.success("تم التسجيل بنجاح.");
      setForm({
        fullname: "",
        grade: "",
        phone: "",
        parentPhone: "",
        gender: "",
        email: "",
        password: "",
        passwordConfirm: "",

      });
      
      navigate("/login")
    } catch (err) {
      toast.error(`❌ حدث خطأ: ${err.message}`);
    } finally {
      setLoading(false);
    }
    }
  };
  return (
    <div
      className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4"
      dir="rtl"
      style={{ fontFamily: "var(--font-cairo)" }}
    >
      <section className="bg-white max-w-lg w-full p-[var(--spacing-card)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-primary)] text-center">
          تسجيل حساب جديد
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          {/* الاسم الكامل */}
          <div>
            <label
              htmlFor="fullname"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              اسم الطالب رباعي
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                errors.fullname
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              placeholder="أدخل اسمك الكامل"
              required
            />
            {errors.fullname && (
              <p className="text-red-600 mt-1 text-sm">{errors.fullname}</p>
            )}
          </div>

          {/* صف دراسي صغير (full width small input) */}
          <div className="relative w-1/2">
            <label
              htmlFor="grade"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              الصف الدراسي
            </label>
            <select
              id="grade"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 appearance-none bg-white focus:outline-none focus:ring-2 transition ${
                errors.grade
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              required
            >
              {gradesOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>
            <DropDownArrow />
            {errors.grade && (
              <p className="text-red-600 mt-1 text-sm">{errors.grade}</p>
            )}
          </div>

          {/* Two inputs side by side for phone and parent phone */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="phone"
                className="block mb-1 text-[var(--color-text-main)] font-semibold"
              >
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                pattern="[0-9]{10,15}"
                placeholder="مثال: 01234567890"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }`}
                required
              />
              {errors.phone && (
                <p className="text-red-600 mt-1 text-sm">{errors.phone}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="parentPhone"
                className="block mb-1 text-[var(--color-text-main)] font-semibold"
              >
                رقم هاتف ولي الأمر
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                value={form.parentPhone}
                onChange={handleChange}
                pattern="[0-9]{10,15}"
                placeholder="مثال: 01234567890"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                  errors.parentPhone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }`}
                required
              />
              {errors.parentPhone && (
                <p className="text-red-600 mt-1 text-sm">{errors.parentPhone}</p>
              )}
            </div>
          </div>

          {/* Gender dropdown */}
          <div className="relative w-1/2">
            <label
              htmlFor="gender"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              الجنس
            </label>

            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 pr-10 appearance-none bg-white focus:outline-none focus:ring-2 transition ${
                errors.gender
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              required
            >
              {genders.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>

            <DropDownArrow />
            {errors.gender && (
              <p className="text-red-600 mt-1 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              placeholder="example@mail.com"
              required
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">{errors.email}</p>
            )}
          </div>

          {/* كلمة المرور */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              placeholder="••••••••"
              minLength={8}
              required
            />
            {errors.password && (
              <p className="text-red-600 mt-1 text-sm">{errors.password}</p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block mb-1 text-[var(--color-text-main)] font-semibold"
            >
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition ${
                errors.passwordConfirm
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[var(--color-primary)]"
              }`}
              placeholder="••••••••"
              minLength={8}
              required
            />
            {errors.passwordConfirm && (
              <p className="text-red-600 mt-1 text-sm">{errors.passwordConfirm}</p>
            )}
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition text-white font-bold py-3 rounded-md"
          >
            {loading ? "جاري التسجيل..." : "إنشاء حساب"}
          </button>
        </form>

        {/* رابط تسجيل الدخول */}
        <p className="mt-6 text-center text-[var(--color-text-muted)] text-sm">
          لديك حساب بالفعل؟{" "}
          <a
            href="/login"
            className="text-[var(--color-accent)] hover:underline font-semibold"
          >
            تسجيل الدخول
          </a>
        </p>
      </section>
    </div>
  );
}
