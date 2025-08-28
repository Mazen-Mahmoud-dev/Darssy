import { Facebook, Instagram, Phone, Mail } from "lucide-react"

export default function ContactUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">☎️ اتصل بنا</h1>
        <p className="text-lg text-gray-600">
          نحن هنا لدعمك في أي وقت! تواصل معنا عبر الوسائل المختلفة التالية.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          {/* <img
            src="https://images.unsplash.com/photo-1581091870622-9c8d8b6d2a3e?auto=format&fit=crop&w=800&q=80"
            alt="Contact Us"
            className="rounded-2xl shadow-lg"
          /> */}
          <h2 className="text-7xl">📚 درسي</h2>
        </div>

        {/* Right Text */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Phone className="w-7 h-7 text-green-600" />
            <p className="text-gray-700 text-lg">+20 111 222 3333</p>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="w-7 h-7 text-blue-600" />
            <p className="text-gray-700 text-lg">support@darssy.com</p>
          </div>

          <div className="flex items-center gap-4">
            <Facebook className="w-7 h-7 text-blue-800" />
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 text-lg hover:underline"
            >
              صفحتنا على فيسبوك
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Instagram className="w-7 h-7 text-pink-600" />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 text-lg hover:underline"
            >
              تابعنا على إنستجرام
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
