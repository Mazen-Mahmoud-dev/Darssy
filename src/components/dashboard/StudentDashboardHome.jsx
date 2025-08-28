// pages/dashboard/DashboardHome.jsx
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsSection from "@/components/dashboard/StatsSection";
import LecturesSection from "@/components/dashboard/LecturesSection";
import NotificationsSection from "@/components/dashboard/NotificationsSection";
import useDashboardData from "@/hooks/useDashboardData";

export default function DashboardHome() {
  const { stats, purchasedLectures, notifications, loading } = useDashboardData();

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">أهلاً بك 👋</h1>
        <p className="text-gray-500 mt-1">هذا ملخص سريع لنشاطك الأخير.</p>
      </header>

      <StatsSection stats={stats} loading={loading} />

      <div className="mt-8">
        <LecturesSection lectures={purchasedLectures} loading={loading} />
        <NotificationsSection notifications={notifications} loading={loading} />
      </div>
    </>
  );
}
