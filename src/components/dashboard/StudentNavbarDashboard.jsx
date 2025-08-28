import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import WalletBadge from '../WalletBadge';
import { useWallet } from "../../context/WalletContext";
export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const { balance } = useWallet();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { label: 'الرئيسية', path: '/dashboard' },
    { label: 'محاضراتي', path: '/dashboard/my-lectures' },
    { label: 'كل المحاضرات', path: '/dashboard/all-lectures' },
    { label: 'الإشعارات', path: '/dashboard/notifications' },
    { label: 'الملف الشخصي', path: '/dashboard/profile' },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between" dir="rtl">
        {/* الشعار */}
        <h1 className="text-xl font-bold text-[var(--color-primary)]">📚 درسي</h1>

        {/* روابط للشاشات الكبيرة */}
        <nav className="hidden lg:flex gap-6 text-gray-700 font-medium">
          <WalletBadge balance={balance} />
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="relative group"
            >
              <span className="hover:text-[var(--color-primary)] transition-colors">
                {link.label}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            تسجيل الخروج
          </button>
        </nav>

        {/* زر القائمة للشاشات الصغيرة */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 lg:hidden cursor-pointer"
        >
          <img
            src="/userImage.svg"
            alt="User"
            className="w-9 h-9 rounded-full border"
          />
          <ChevronDown className="w-5 h-5" />
        </button>
      </header>

      {/* Full Screen Menu للموبايل فقط */}
      <div className={"block lg:hidden"}>
        <WalletBadge balance={balance}  />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setIsOpen(false)}>
          {/* الخلفية */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* المحتوى */}
          <div className="fixed inset-0 overflow-y-auto" dir="rtl">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-right shadow-xl">
                  {/* زر الإغلاق */}
                  <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">القائمة</h2>
                    <button onClick={() => setIsOpen(false)} className='cursor-pointer'>
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* روابط التنقل */}
                  <nav className="space-y-3">
                    {navLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.path}
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      تسجيل الخروج
                    </button>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
