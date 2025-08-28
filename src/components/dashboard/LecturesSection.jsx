import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { Lock, Unlock } from 'lucide-react'
import Loading from '../Loading'
import { useWallet } from "../../context/WalletContext";
import { Link, useNavigate } from 'react-router-dom';
export default function LectureSection( { IsMyLectures }) {
  const [lectures, setLectures] = useState([])
  const [loading, setLoading] = useState(true)
  const { setBalance } = useWallet();
  const [session,setSession] = useState(null);
  const [checkSession,setCheckSession] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    fetchLectures()
  }, [])

  async function fetchLectures() {
    setLoading(true)

    // جلب المستخدم الحالي
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("user error: ", userError);

      // 👇 check لو الخطأ بسبب انتهاء صلاحية الـ JWT
      if (userError?.message?.includes("JWT") || userError?.message?.includes("expired")) {
        await supabase.auth.signOut();
        navigate("/login");
        return;
      }

      setLoading(false)
      return;
    }

    // باقي الكود بتاعك زي ما هو ...
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, grade')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error("profile error: ", profileError);

      if (profileError?.message?.includes("JWT") || profileError?.message?.includes("expired")) {
        await supabase.auth.signOut();
        navigate("/login");
        return;
      }

      setLoading(false)
      return
    }

    let data = []
    if (profile.role === 'student') {
      let res;
      if (IsMyLectures) {
        res = await supabase
          .from('lectures')
          .select(`*, purchases!left(student_id)`)
          .eq('grade', profile.grade)
          .eq('purchases.student_id', user.id)
      } else {
        res = await supabase
          .from('lectures')
          .select(`*, purchases!left(student_id)`)
          .eq('grade', profile.grade)
      }

      if (res.error) {
        console.error("lectures error: ", res.error);

        if (res.error?.message?.includes("JWT") || res.error?.message?.includes("expired")) {
          await supabase.auth.signOut();
          navigate("/login");
          return;
        }
      }

      data = (res.data || []).map(lec => ({
        ...lec,
        is_purchased: lec.purchases && lec.purchases.length > 0
      }))
    }

    setLectures(data)
    setLoading(false)
  }


  async function handlePurchase(lectureId,price) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error(userError)
      setLoading(false)
      return
    }
  // 1️⃣ جلب رصيد الطالب
    const { data: wallet, error: walletError } = await supabase
      .from('wallet')
      .select('balance')
      .eq('student_id', user.id)
      .single()

      if (walletError || !wallet) {
        return alert("تعذر الوصول إلى المحفظة")
      }
      

      // 2️⃣ التحقق من الرصيد
      if (wallet.balance < price) {
        return alert("رصيدك غير كافي لشراء هذه المحاضرة")
      }

      // 3️⃣ خصم السعر من المحفظة
      const newBalance = wallet.balance - price
      const { error: updateError } = await supabase
        .from('wallet')
        .update({ balance: Number(newBalance) })
        .eq('student_id', user.id)

      if (updateError) {
        return alert("حدث خطأ أثناء تحديث الرصيد")
      }

      // 4️⃣ إضافة عملية الشراء
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert([{ student_id: user.id, lecture_id: lectureId }])

      if (purchaseError) {
        // لو حصل خطأ في الشراء لازم نرجع الرصيد زي ما كان
        await supabase
          .from('wallet')
          .update({ balance: wallet.balance })
          .eq('student_id', user.id)

        return alert("حدث خطأ أثناء إتمام عملية الشراء")
      }
      
      setBalance(newBalance);
      // 5️⃣ تحديث القائمة بعد الشراء
      fetchLectures()
      alert("✅ تم شراء المحاضرة بنجاح!")
  }


  if (loading) return <div className="p-4"><Loading /></div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">📚 قائمة المحاضرات</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="relative bg-white shadow-md rounded-2xl border overflow-hidden hover:shadow-xl transition"
          >
            {/* صورة الغلاف */}
            <div className="relative">
              <img
                src={lecture.cover_url}
                alt={lecture.title}
                className="w-full h-48 object-cover"
              />
              {/* أيقونة القفل/الفتح */}
              <div className="absolute top-3 left-3 bg-white p-1 rounded-full shadow">
                {lecture.is_purchased ? (
                  <Unlock className="w-6 h-6 text-green-500" />
                ) : (
                  <Lock className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>

            {/* تفاصيل المحاضرة */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{lecture.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{lecture.description || "لا يوجد وصف"}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">
                💵 {lecture.price} ج.م
              </p>

              {/* زر الفتح أو الشراء */}
              {lecture.is_purchased ? (
                <Link
                  to={`/dashboard/lectures/${lecture.id}`}
                  target="_self"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  فتح المحاضرة
                </Link>
              ) : (
                <button
                  onClick={() => {handlePurchase(lecture.id,lecture.price)}}
                  className="w-full px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition"
                >
                  شراء المحاضرة
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
