import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error) setNotifications(data)
      setLoading(false)
    }

    fetchNotifications()

    // ✅ Real-time listener
    const channel = supabase
      .channel("notifications-channel")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications"
      }, (payload) => {
        setNotifications((prev) => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { notifications,setNotifications, loading }
}
