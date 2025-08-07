"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./editing.module.css";

const dummyConversation = [
  {
    id: 1,
    speaker: "A",
    text: "Hey, how are you doing?",
    image: "/logo.png",
  },
  {
    id: 2,
    speaker: "B",
    text: "I'm good, thanks! What about you?",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
  {
    id: 3,
    speaker: "A",
    text: "All good here, excited for the project!",
    image: "/logo.png",
  },
  {
    id: 4,
    speaker: "B",
    text: "Let’s make it go viral!",
    image: "/login.jpg",
  },
];

export default function EditingPanel() {
  const [showVideo, setShowVideo] = useState(false);

  if (showVideo) {
    return (
      <div className="w-full flex flex-col items-center text-white px-4 py-4 pb-20 overflow-y-auto">
        <video
          src="/testing.mp4"
          className="w-full max-w-2xl max-h-[400px] rounded-lg"
          controls
        />
        <button
          onClick={() => setShowVideo(false)}
          className="w-[60%] mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center text-white px-4 py-6 bg-black">
      <div className={styles.container}>
        {/* Scrollable conversation area */}
        <div className={styles.conversationScroll}>
          {dummyConversation.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.speaker === "A" ? styles.left : styles.right
              }`}
            >
              <Image
                src={msg.image}
                alt={`Speaker ${msg.speaker}`}
                width={40}
                height={40}
                className={styles.avatar}
              />
              <div className={styles.messageBubble}>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Buttons below conversation */}
        <div className={styles.buttonsSection}>
          <div className={styles.buttonRow}>
            <button className={styles.button}>Edit Character 1</button>
            <button className={styles.button}>Edit Character 2</button>
            <button className={styles.button}>Edit Story</button>
          </div>
          <button
            onClick={() => setShowVideo(true)}
            className={`${styles.button} ${styles.generateButton}`}
          >
            Generate Video
          </button>
        </div>
      </div>
    </div>
  );
}
