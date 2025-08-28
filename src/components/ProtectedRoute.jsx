import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useSupabase } from "../SupabaseContext"
import Loading from "./Loading"

export default function ProtectedRoute({ children }) {
  const supabase = useSupabase()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
      console.log(session);
      
    }
    checkUser()
  }, [supabase])

  if (loading) return <Loading />;  
  if (!user) return <Navigate to="/login" replace />;
  

  return children
}
