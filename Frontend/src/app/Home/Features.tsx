'use client';
import styles from "./Features.module.css";
import { FaMagic, FaRobot, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: <FaMagic className="text-3xl text-blue-500" />,
    title: "Auto-Shorts from YouTube",
    desc: "Paste a link, and our AI turns it into a scroll-stopping short.",
  },
  {
    icon: <FaRobot className="text-3xl text-purple-500" />,
    title: "AI-Generated Conversations",
    desc: "Let characters talk using their original voices or your script.",
  },
  {
    icon: <FaBolt className="text-3xl text-yellow-500" />,
    title: "Fast, Creator-Ready Output",
    desc: "Subtitles, voice, and export — ready for Instagram & TikTok.",
  },
];

export default function Features() {
  return (
    <section className={`w-full py-20 px-4 bg-[#121212] text-white ${styles.featuresSection}`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Why Creators Love Our Tool
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
