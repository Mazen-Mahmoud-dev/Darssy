import { Bell, CheckCircle, Clock, Check } from "lucide-react"
import { useNotifications } from "@/hooks/useNotifications"
import { supabase } from "@/lib/supabaseClient"

export default function NotificationsPage() {
  const { notifications, loading,setNotifications } = useNotifications()

  // ✅ Mark single notification as read
  const markAsRead = async (id) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)

    if (error) console.error(error)
    else {
    // ✅ تحديث كل الإشعارات في الـ state
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true }))
    )
  }
  }

  // ✅ Mark all notifications as read
  const markAllAsRead = async () => {
    const hasUnread = notifications.some((n) => !n.is_read)

    if (!hasUnread) {
      return
    }
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false)

    if (error) console.error(error)
    else{
      setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        )
    }
  }

  if (loading) return <p className="text-center py-8">⏳ جاري تحميل الإشعارات...</p>

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Bell className="w-12 h-12 mb-2" />
        <p>📭 لا توجد إشعارات حالياً</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      {/* 🔔 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" />
          الإشعارات
        </h1>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          تعليم الكل كمقروء
        </button>
      </div>

      {/* 🔥 Notifications list */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border shadow-sm transition flex justify-between items-start ${
              n.is_read
                ? "bg-gray-100 border-gray-200"
                : "bg-white border-blue-200"
            }`}
          >
            <div>
              <h2 className="font-semibold text-lg flex items-center gap-2">
                {n.is_read ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500" />
                )}
                {n.title}
              </h2>
              <p className="text-gray-700 mt-2">{n.message}</p>
              <span className="block text-sm text-gray-500 mt-1">
                {new Date(n.created_at).toLocaleString("ar-EG")}
              </span>
            </div>

            {/* ✅ Mark single notification as read */}
            {!n.is_read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-4 h-4" /> تميييز كمقروء
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
