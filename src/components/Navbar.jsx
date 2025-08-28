import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "نظامنا", href: "/oursystem" },
    { label: "من نحن", href: "/about-us" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  return (
    <header className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-primary text-2xl font-bold font-cairo">
          درسي
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-text-main hover:text-primary transition-colors font-cairo"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-white transition"
          >
            تسجيل الدخول
          </Link>
          <Link
            to="register"
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-primary"
        >
          <Menu size={28} className="cursor-pointer"  />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-stone-200 bg-opacity-25 z-50 md:hidden">
          <div className="absolute top-0 right-0 w-64 bg-background h-full shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-primary text-xl font-bold">القائمة</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-primary"
              >
                <X size={28} className="cursor-pointer" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-main hover:text-primary transition-colors font-cairo"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-white transition text-center"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition text-center"
              >
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
