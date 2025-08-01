'use client';

import styles from './Canvas.module.css';

export default function Canvas() {
  return (
    <div className="flex-1 bg-black flex items-center justify-center relative">
      <div className="w-[80%] aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        {/* Placeholder for video content */}
        <video
          className="w-full h-full object-contain"
          controls
          src="/sample.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
