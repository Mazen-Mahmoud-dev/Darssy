import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/hero-illustration.webp')", // Replace with your image path
      }}
      dir="rtl"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 min-h-[80vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl lg:text-5xl font-bold font-cairo leading-snug max-w-3xl">
          ارتقِ بمستواك الدراسي مع{" "}
          <span className="text-accent">درسي</span>
        </h1>

        <p className="mt-4 text-base lg:text-lg max-w-2xl font-cairo text-gray-200 leading-relaxed">
          جلسات مباشرة مع معلمين متميزين، موارد تعليمية حصرية، ودعم مستمر حتى تصل إلى هدفك.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <Link
            to="/register"
            className="px-6 py-3 bg-primary rounded-lg hover:bg-primary-light transition font-cairo text-sm lg:text-base shadow-lg"
          >
            طالب جديد
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-primary transition font-cairo text-sm lg:text-base"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </section>

  );
}
