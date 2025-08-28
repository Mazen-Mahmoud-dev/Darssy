export default function StatCard({ title, value, icon: Icon, color = 'bg-blue-500' }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg text-white ${color}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
