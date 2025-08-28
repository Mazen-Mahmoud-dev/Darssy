import { X } from 'lucide-react';
export default function StudentSidebar({ isOpen, onClose }) {
  const navLinks = [
    { label: "الرئيسية 🏠", href: "/dashboard" },
    { label: "المحاضرات المشتراة 🎥", href: "/dashboard/my-lectures" },
    { label: "كل المحاضرات 📚", href: "/dashboard/all-lectures" },
    { label: "المذكرات والملفات 📄", href: "/dashboard/files" },
    { label: "سجل المدفوعات 💳", href: "/dashboard/payments" },
    { label: "الإشعارات 🔔", href: "/dashboard/notifications" },
    { label: "الملف الشخصي 👤", href: "/dashboard/profile" },
  ];

  return (
    <>
      {/* خلفية معتمة عند الفتح على الموبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* الـ Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* زر الإغلاق للموبايل */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* روابط التنقل */}
        <nav className="mt-6 space-y-2 px-4">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-700 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
