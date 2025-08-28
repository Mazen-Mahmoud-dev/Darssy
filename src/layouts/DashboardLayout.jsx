import { Outlet,useNavigate } from 'react-router-dom';
import StudentNavbar from '@/components/dashboard/StudentNavbarDashboard';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { useEffect,useState } from 'react';
import Loading from '../components/Loading';

export default function DashboardLayout() {
  
  const [session,setSession] = useState(null);
  const [checkSession,setCheckSession] = useState(false)
  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()    
    setSession(currentSession.data)
    setCheckSession(true)
  }
  useEffect(()=>{
    fetchSession()
    
  },[checkSession])
  if(!session && checkSession){
      useNavigate("/login")
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)]" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
      <StudentNavbar />
      <main className="p-6 flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}