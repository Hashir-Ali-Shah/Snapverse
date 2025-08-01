'use client';

import { useState } from 'react';

export default function VideoPanel() {
  const [videoURL, setVideoURL] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

  return (
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
  );
}
