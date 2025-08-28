import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Loading from "../Loading"

export default function FilesSection({ lectureId , lectureFiles}) {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from("lecture_details")
        .select("id, title, files")
        .eq("lecture_id", lectureId)

      if (error) {
        console.error("error in loading files: ",error)
      } else {
        // 🛠️ نحول paths لـ signed URLs
        const signedFiles = await Promise.all(
          (lectureFiles || []).map(async (file) => {
            const { data: signed, error: signedError } = await supabase
              .storage
              .from("lecture_resources") // ✅ الباكيت اللي رفعت فيه الملفات
              .createSignedUrl(file.url, 3600)

            if (signedError) {
              console.error(signedError)
              return file
            }

            return { ...file, signedUrl: signed.signedUrl }
          })
        )

        console.log("signedFiles: ",signedFiles);
        
        setFiles(signedFiles)
      }
    }

    fetchFiles()
  }, [lectureId])

  if (!files.length) return <Loading />
  if(files.length == 0 ) return <p>🚫 لا يوجد ملفات لهذه المحاضرة</p>

  return (
    <div className="space-y-4">
      {files.map((file,index) => (
        <a
          key={index}
          href={file.signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 border rounded-lg hover:bg-gray-100"
        >
          📄 {file.name}
        </a>
      ))}
    </div>
  )
}
