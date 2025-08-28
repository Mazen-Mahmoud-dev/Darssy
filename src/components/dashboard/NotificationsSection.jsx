export default function c({ notifications, loading }) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-4">الإشعارات 🔔</h2>
      {loading ? (
        <p>جارِ التحميل...</p>
      ) : notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id} className="bg-white p-4 rounded-xl shadow-sm">
              {n.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>لا توجد إشعارات.</p>
      )}
    </section>
  );
}
