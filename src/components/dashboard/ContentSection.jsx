export default function ContentSection({ lecture }) {
  return (
    <div className="p-4">
      <p className="text-gray-700 mb-2">{lecture.description}</p>
      <p className="text-sm text-gray-500">
        📅 تاريخ الإضافة: {new Date(lecture.created_at).toLocaleDateString()}
      </p>
    </div>
  )
}
