import { useEffect, useState } from 'react';
import { BookOpen, Bell, ShoppingCart } from 'lucide-react';


export default function useDashboardData() {
  const [stats, setStats] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // هنا هنحط Mock Data مؤقتًا
    const timer = setTimeout(() => {
      setStats([
        { id: 1, title: 'محاضرات مشتراة', value: 5, icon: ShoppingCart, color: 'bg-green-500' },
        { id: 2, title: 'محاضرات جديدة', value: 2, icon: BookOpen, color: 'bg-blue-500' },
        { id: 3, title: 'إشعارات', value: 4, icon: Bell, color: 'bg-yellow-500' },
      ]);

      setLectures([
        { id: 1, title: 'محاضرة الرياضيات 1' },
        { id: 2, title: 'محاضرة الفيزياء 2' },
      ]);

      setNotifications([
        { id: 1, message: 'تم إضافة محاضرة جديدة' },
        { id: 2, message: 'موعد الامتحان يوم الجمعة' },
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { stats, purchasedLectures: lectures, notifications, loading };
}
