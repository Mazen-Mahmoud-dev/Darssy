import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, User, Phone, Mail, GraduationCap, Edit2 } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", email: "", grade: "", parent_phone: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("students")
        .select("full_name, phone, parent_phone, email, grade")
        .eq("id", user.id)
        .single();
      if (!error && data) {
        setProfile(data);
        setEditForm(data);
      }
    }
    setLoading(false);
  }

  async function updateProfile(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("students")
      .update({
        full_name: editForm.full_name,
        phone: editForm.phone,
      })
      .eq("email", editForm.email);

    if (!error) {
      alert("تم تحديث البيانات بنجاح ✅");
      setProfile({ ...profile, full_name: editForm.full_name, phone: editForm.phone });
      setModalOpen(false);
    }
    setLoading(false);
  }

  if (loading && !profile) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }
  const gradeMap = {
    "senior1": "الصف الأول الثانوي",
    "senior2": "الصف الثاني الثانوي",
    "senior3": "الصف الثالث الثانوي",
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">الملف الشخصي</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1 cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          <Edit2 size={16} /> تعديل
        </button>
      </div>

      {/* عرض البيانات */}
      <div className="space-y-4 text-gray-700">
        <p><User className="inline w-4 h-4 ml-1" /> {profile.full_name}</p>
        <p><Phone className="inline w-4 h-4 ml-1" /> {profile.phone}</p>
        <p><Phone className="inline w-4 h-4 ml-1" /> هاتف ولي الأمر: {profile.parent_phone}</p>
        <p><Mail className="inline w-4 h-4 ml-1" /> {profile.email}</p>
        <p><GraduationCap className="inline w-4 h-4 ml-1" /> {gradeMap[profile.grade] || profile.grade} </p>
      </div> 

      {/* المودال */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">تعديل البيانات</h3>
            <form onSubmit={updateProfile} className="space-y-4">
              {/* الاسم */}
              <input
                type="text"
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />

              {/* الهاتف */}
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />

              {/* هاتف ولي الأمر - مقفل */}
              <input
                type="text"
                value={editForm.parent_phone}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
              />

              {/* البريد الإلكتروني - مقفل */}
              <input
                type="email"
                value={editForm.email}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
              />

              {/* الأزرار */}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition cursor-pointer"
                >
                  {loading ? "جارٍ الحفظ..." : "حفظ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
