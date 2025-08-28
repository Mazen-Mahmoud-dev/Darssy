import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast.error("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } else {
      toast.success("✅ تم تسجيل الدخول بنجاح");
      setTimeout(() => {
        window.location.href = "/"; // إعادة التوجيه للصفحة الرئيسية
      }, 1000);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4"
      dir="rtl"
      style={{ fontFamily: "var(--font-cairo)" }}
    >
      <section className="bg-white max-w-md w-full p-[var(--spacing-card)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-primary)] text-center">
          تسجيل الدخول
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
              className="w-full border rounded-md px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="example@mail.com"
              required
            />
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
              className="w-full border rounded-md px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="••••••••"
              required
            />
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition text-white font-bold py-3 rounded-md"
          >
            {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        {/* رابط التسجيل */}
        <p className="mt-6 text-center text-[var(--color-text-muted)] text-sm">
          ليس لديك حساب؟{" "}
          <a
            href="/register"
            className="text-[var(--color-accent)] hover:underline font-semibold"
          >
            إنشاء حساب جديد
          </a>
        </p>
      </section>
    </div>
  );
}
