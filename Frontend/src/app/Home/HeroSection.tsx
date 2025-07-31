'use client';
import { useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [videoLink, setVideoLink] = useState("");

  const handleGetStarted = () => {
    if (!videoLink) return;
    // logic to handle the video link submission
    console.log("Download initiated for:", videoLink);
  };

  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center bg-[#0f0f0f] text-white overflow-hidden ${styles.heroBg}`}>
      <div className="z-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Turn YouTube Videos into Stunning Shorts with AI
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 mb-8">
          Download videos, edit, add voices — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Paste YouTube link..."
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full sm:w-96 px-4 py-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </div>
      {/* Animated background layer */}
      <div className={styles.animatedLayer}></div>
    </section>
  );
}
