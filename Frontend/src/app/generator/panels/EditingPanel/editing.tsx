'use client';

import { useRef, useState, useEffect } from 'react';

export default function EditingPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener('timeupdate', updateTime);
    return () => video.removeEventListener('timeupdate', updateTime);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center text-white gap-4 px-4 py-4 overflow-y-auto">
      <video
        ref={videoRef}
        src="/Gangnam_Style.mp4" // Ensure this video exists in your /public folder
        className="w-full max-w-3xl rounded-lg"
        controls
      />
    </div>
  );
}
