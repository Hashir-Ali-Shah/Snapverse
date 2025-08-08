"use client";

import { useState } from "react";
import styles from "./video.module.css";

export default function VideoPanel({
  onSelectPanel,
  setVideo,
  video,
}: {
  onSelectPanel: (panel: string) => void;
  setVideo: (value: string) => void;
  video: string;
}) {
  const [videoURL, setVideoURL] = useState("");
  const [videos, setVideos] = useState([
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
    "/testing.mp4",
  ]);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

  const videoHandler = (videoSrc: string) => {
    if (video == "") {
      setVideo(videoSrc);
      onSelectPanel("video");
    } else if (video === videoSrc) {
      setVideo(""); // Deselect if already selected
    }
  };
  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className="flex flex-col gap-3 p-4">
          <label htmlFor="video-url" className="font-semibold text-slate-200">
            Enter YouTube URL or upload:
          </label>
          <input
            type="text"
            id="video-url"
            value={videoURL}
            onChange={handleInputChange}
            placeholder="Paste YouTube link..."
            className="px-3 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {videos.map((videoSrc, idx) => (
            <div
              onClick={() => videoHandler(videoSrc)}
              key={idx}
              className={`${styles.card} h-56`} // no padding here
            >
              <video
                src={videoSrc}
                className={`w-full h-full rounded-none object-cover ${
                  videoSrc == video ? "ring-4 ring-yellow-400" : ""
                }`}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
