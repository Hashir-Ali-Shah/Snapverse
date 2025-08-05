"use client";

import { useState } from "react";
import styles from "./video.module.css";

export default function VideoPanel() {
  const [videoURL, setVideoURL] = useState("");
  const characters = Array.from({ length: 20 });
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

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
        <div className={`grid grid-cols-4 gap-4 pr-2 `}>
          {characters.map((_, idx) => (
            <div key={idx} className={`p-2 rounded ${styles.card}`}>
              <img
                src="/logo.png"
                alt={`Character ${idx + 1}`}
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
