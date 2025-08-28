import { Tabs } from "@/components/ui/Tabs"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useParams } from "react-router-dom"
import Loading from "../Loading"
import { VideoPlayer } from "./VideoPlayer"
import FilesSection from "./FilesSection"

export default function LectureDetails() {
  const [lecture, setLecture] = useState(null)
  const { lectureId } = useParams()

  useEffect(() => {
    const fetchLecture = async () => {
      const { data, error } = await supabase
        .from("lecture_details")
        .select(`*`)
        .eq("lecture_id", lectureId)
        .maybeSingle()

      if (!error) setLecture(data)
    }

    fetchLecture()
  }, [lectureId])

  if (lecture?.length === 0) return "لا توجد تفاصيل للمحاضرات"
  if (!lecture) return <Loading />

  // ✅ Tabs الفرعية للفيديوهات
  const videoTabs = []
  if (lecture.video_part1) {
    videoTabs.push({
      name: "📽️ Part 1",
      content: (
        <VideoPlayer path={lecture.video_part1} />
      ),
    })
  }
  if (lecture.video_part2) {
    videoTabs.push({
      name: "🎬 Part 2",
      content: (
        <VideoPlayer path={lecture.video_part2} />
      ),
    })
  }
  if (lecture.video_summary) {
    videoTabs.push({
      name: "📝 Summary",
      content: (
        <VideoPlayer path={lecture.video_summary} />
      ),
    })
  }
  if (lecture.video_homework) {
    videoTabs.push({
      name: "📚 Homework",
      content: (
        <VideoPlayer path={lecture.video_homework} />
      ),
    })
  }
  console.log("lecture: ",lecture);
  
  // 🔥 Tabs الرئيسية
  const tabs = [
    {
      name: "📘 محتوى المحاضرة",
      content: <p>{lecture.description}</p>,
    },
    {
      name: "🎥 مشاهدة الفيديو",
      content: videoTabs.length ? (
        <Tabs tabs={videoTabs} />
      ) : (
        <p>لا يوجد فيديوهات لهذه المحاضرة</p>
      ),
    },
    {
      name: "📂 ملفات المحاضرة",
      content: <FilesSection lectureId={lectureId} lectureFiles={lecture.files} /> 
    },
  ]

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{lecture.title}</h1>
      <Tabs tabs={tabs} />
    </div>
  )
}
