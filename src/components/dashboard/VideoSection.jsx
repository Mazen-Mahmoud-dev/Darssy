import { useEffect, useState } from "react"
import {supabase} from "@/lib/supabaseClient"

export default function VideoSection({ lectureId }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("lecture_videos")
        .select("id, title, video_url")
        .eq("lecture_id", lectureId)

      if (error) console.error(error)
      else setVideos(data || [])
    }

    fetchVideos()
  }, [lectureId])

  if (!videos.length) return <p>🚫 لا يوجد فيديوهات لهذه المحاضرة</p>

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="p-4 border rounded-lg">
          <h3 className="font-semibold">{video.title}</h3>
          <video controls className="w-full rounded mt-2">
            <source src={video.video_url} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
      ))}
    </div>
  )
}
