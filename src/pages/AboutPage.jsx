export default function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">👥 من نحن</h1>
        <p className="text-lg text-gray-600">
          فريق تعليمي متخصص يقدم لك رحلة تعليمية مختلفة تجمع بين الإبداع، التفاعل،
          والالتزام بجودة المحتوى.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          {/* <img
            src="https://images.unsplash.com/photo-1600195077073-7c815f540a3b?auto=format&fit=crop&w=800&q=80"
            alt="Our Team"
            className="rounded-2xl shadow-lg"
          /> */}
          <h2 className="text-7xl">📚 درسي</h2>
        </div>

        {/* Right Text */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">🎯 رؤيتنا</h2>
          <p className="text-gray-600 leading-relaxed">
            نسعى لتقديم تعليم يواكب تطلعات الطلاب في العصر الرقمي، من خلال الدمج
            بين التكنولوجيا والشرح المبسط.
          </p>

          <h2 className="text-2xl font-semibold">💡 رسالتنا</h2>
          <p className="text-gray-600 leading-relaxed">
            مهمتنا هي تبسيط المفاهيم الصعبة وتحويلها إلى تجربة تعليمية ممتعة،
            ترفع من مستوى الطالب وتمنحه الثقة في نفسه.
          </p>

          <h2 className="text-2xl font-semibold">⭐ قيمنا</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>الالتزام بالجودة</li>
            <li>تشجيع التفكير والإبداع</li>
            <li>التركيز على الطالب كأولوية</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
