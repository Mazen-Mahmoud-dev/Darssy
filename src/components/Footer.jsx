import { Facebook, Instagram, Youtube, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1 - Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">📚 Darssy</h2>
          <p className="text-gray-400 leading-relaxed">
            منصتنا التعليمية تهدف إلى تقديم تجربة مختلفة تجمع بين التفاعل،
            الجودة، والإبداع. مع دروسي، التعلم يصبح أسهل وأمتع.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">روابط سريعة</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/oursystem" className="hover:text-white transition">
                📘 نظامنا
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-white transition">
                👥 من نحن
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                ☎️ اتصل بنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">تابعنا</h2>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="mailto:support@darssy.com" className="hover:text-white">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Darssy. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}
