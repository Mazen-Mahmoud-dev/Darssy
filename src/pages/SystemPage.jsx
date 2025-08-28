import { Video, BookOpen, Users, Headphones, Brain, Trophy } from "lucide-react"

export default function SystemPage() {
  const features = [
    {
      icon: <Video className="w-10 h-10 text-blue-600" />,
      title: "🎥 فيديوهات أونلاين بجودة عالية",
      desc: "محاضرات بدقة عالية تمنحك مشاهدة مريحة، مع أسلوب تدريسي مرن يناسب جميع المستويات الفكرية."
    },
    {
      icon: <BookOpen className="w-10 h-10 text-green-600" />,
      title: "📝 اختبارات أونلاين",
      desc: "اختبر نفسك لتعرف مستواك وتحدد الثغرات في فهمك، مع تصحيح فوري يعزز تعلمك."
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: "📡 محاضرات مباشرة (Live)",
      desc: "تفاعل مباشر مع المدرس، واطرح أسئلتك لحظة بلحظة للحفاظ على التواصل المستمر."
    },
    {
      icon: <Headphones className="w-10 h-10 text-pink-600" />,
      title: "🤝 مساعد شخصي",
      desc: "دعم فوري لمساعدتك في أي صعوبة أو استفسار خلال رحلتك الدراسية."
    },
    {
      icon: <Brain className="w-10 h-10 text-orange-600" />,
      title: "💡 أسئلة تفكير متقدمة",
      desc: "نلهم عقلك بأفكار وأسئلة متعمقة ترفع مستوى تفكيرك وتوسع آفاقك."
    },
    {
      icon: <Trophy className="w-10 h-10 text-yellow-600" />,
      title: "🏆 مسابقات شهرية",
      desc: "أجواء مليئة بالحماس والمنافسة لزيادة دافعك وتشجيعك على التميز."
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">📘 نظامنا التعليمي</h1>
        <p className="text-lg text-gray-600">
          نقدم تجربة تعليمية متكاملة تساعدك على الفهم، الممارسة، والتفوق.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          {/* <img
            src="https://images.unsplash.com/photo-1584697964154-0afbe6f79d2d?auto=format&fit=crop&w=800&q=80"
            alt="Education"
            className="rounded-2xl shadow-lg"
          /> */}
          <h2 className="text-7xl">📚 درسي</h2>
        </div>

        {/* Right Text */}
        <div className="space-y-8">
          {features.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
