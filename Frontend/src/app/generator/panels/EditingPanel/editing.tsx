"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./editing.module.css";

export default function EditingPanel({
  onSelectPanel,
  imageA,
  imageB,
  video,
  conversation,
}: {
  onSelectPanel: (panel: string) => void;
  imageA: string;
  imageB: string;
  video: string;
  conversation: { id: number; speaker: string; text: string }[];
}) {
  const [showVideo, setShowVideo] = useState(true);
  const [loading, setLoading] = useState(false); // <-- loading state
  const [videopath, setVideo] = useState("/output_video.mp4");

  const isReady =
    imageA.trim() !== "" &&
    imageB.trim() !== "" &&
    video.trim() !== "" &&
    conversation.length > 0;

  const splitConversation = (
    conversation: { id: number; speaker: string; text: string }[],
    maxWords = 3
  ) => {
    const result: { id: number; speaker: string; text: string }[] = [];

    conversation.forEach(({ speaker, text }, index) => {
      // Split into chunks of words
      const words = text.split(/\s+/);
      for (let i = 0; i < words.length; i += maxWords) {
        const chunk = words.slice(i, i + maxWords).join(" ");
        result.push({
          id: result.length + 1,
          speaker,
          text: chunk,
        });
      }
    });

    return result;
  };

  const getVoicePath = (imagePath: string): string => {
    // Extract the base filename without extension
    const fileName = imagePath.split("/").pop()?.split(".")[0];
    if (!fileName) return "";

    // Return the new path in voices folder
    return `/voices/${fileName}.wav`;
  };
  const generateHandler = async () => {
    if (!isReady || loading) return;
    setLoading(true);

    const voiceA = getVoicePath(imageA);
    const voiceB = getVoicePath(imageB);
    const splitConv = splitConversation(conversation, 7);

    const payload = {
      voiceA: voiceA, // e.g. "/public/voices/voiceA.wav"
      voiceB: voiceB, // e.g. "/public/voices/voiceB.wav"
      conversation: conversation, // your conversation array
      imageA: imageA, // e.g. "/public/characters/charA.png"
      imageB: imageB, // e.g. "/public/characters/charB.png"
      video: video, // e.g. "/public/videos/video.mp4"
    };

    const response = await fetch("http://127.0.0.1:8000/process-conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setLoading(false);
    setShowVideo(true);
    setVideo(data.video_path); // Set the video path from the response
  };

  if (showVideo) {
    return (
      <div className="w-full flex flex-col items-center text-white px-4 py-4 pb-20 overflow-y-auto">
        <video
          src={videopath}
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
    <div className="relative min-h-screen w-full flex flex-col items-center text-white px-4 py-6 bg-black">
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] px-6 py-4 rounded-lg flex flex-col items-center animate-pulse">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-300">Processing video...</p>
          </div>
        </div>
      )}

      <div className={styles.container}>
        {/* Scrollable conversation area */}
        <div className={styles.conversationScroll}>
          {!isReady ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-4">
              <p className="mb-2 font-semibold">
                Please select the following before preview:
              </p>
              <ul className="list-disc list-outside ">
                {imageA.trim() === "" && <li>Character 1 Image</li>}
                {imageB.trim() === "" && <li>Character 2 Image</li>}
                {video.trim() === "" && <li>Video</li>}
                {conversation.length === 0 && <li>Conversation</li>}
              </ul>
            </div>
          ) : (
            conversation.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.speaker === "A" ? styles.left : styles.right
                }`}
              >
                <Image
                  src={msg.speaker === "A" ? imageA : imageB}
                  alt={`Speaker ${msg.speaker}`}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
                <div className={styles.messageBubble}>{msg.text}</div>
              </div>
            ))
          )}
        </div>

        {/* Buttons below conversation */}
        {/* Buttons below conversation */}
        <div className={styles.buttonsSection}>
          <div className={styles.buttonRow}>
            <button
              className={styles.button}
              onClick={() => onSelectPanel("video")}
            >
              Edit Video
            </button>
            <button
              className={styles.button}
              onClick={() => onSelectPanel("story")}
            >
              Edit Story
            </button>
            <button
              className={styles.button}
              onClick={() => onSelectPanel("characters")}
            >
              Edit Character 1
            </button>
            <button
              className={styles.button}
              onClick={() => onSelectPanel("characters")}
            >
              Edit Character 2
            </button>
            {/* New "View Video" button if videoPath is not empty */}
            {videopath && videopath !== "" && (
              <button
                className={styles.button}
                onClick={() => setShowVideo(true)}
              >
                View Video
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setLoading(true);
              generateHandler();
            }}
            className={`${styles.button} ${styles.generateButton}`}
            disabled={!isReady || loading}
          >
            {loading ? "Generating..." : "Generate Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
