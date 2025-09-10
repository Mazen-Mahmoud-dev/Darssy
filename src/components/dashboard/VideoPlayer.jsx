import { useEffect, useState, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import { supabase } from "@/lib/supabaseClient";
import Loading from "../Loading";
import "./videoPlayer.css"
export function VideoPlayer({ path }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const getVideoUrl = async () => {
      const { data, error } = await supabase
        .storage
        .from("lecture_videos")
        .createSignedUrl(path, 3600);

      if (data) setVideoUrl(data.signedUrl);
      if (error) console.error(error);
    };

    getVideoUrl();
  }, [path]);

  useEffect(() => {
    if (videoUrl && videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "metadata",
        sources: [{ src: videoUrl, type: "video/mp4" }],
      });
      const controlBar = playerRef.current.getChild("controlBar");

      console.log(controlBar, controlBar?.children());
      playerRef.current.ready(() => {
      // إظهار الـ current time و الـ duration
      if (controlBar) {
        controlBar.addChild("currentTimeDisplay", {}, controlBar.children().length - 2);
        controlBar.addChild("timeDivider", {}, controlBar.children().length - 2);
        controlBar.addChild("durationDisplay", {}, controlBar.children().length - 2);
      }

      videoRef.current.addEventListener("contextmenu", (e) =>
        e.preventDefault()
      );
    })}

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  if (!videoUrl) return <Loading />;

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-theme-fantasy !w-full !h-[500px] cursor-pointer"
        controlsList="nodownload"
      />
    </div>
  );
}
