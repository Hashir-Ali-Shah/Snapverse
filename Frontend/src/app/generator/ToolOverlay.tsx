"use client";

import StoryPanel from "./panels/StoryPanel/story";
import VoicesPanel from "./panels/VoicesPanel/voices";
import CharactersPanel from "./panels/CharactersPanel/characters";
import VideoPanel from "./panels/VideoPanel/video";
import EditingPanel from "./panels/EditingPanel/editing";
import { useState } from "react";

export default function ToolOverlay({
  activePanel,
  onSelectPanel,
}: {
  activePanel: string | null;
  onSelectPanel: (panel: string) => void;
}) {
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [video, setVideo] = useState("");
  const [conversation, setConversation] = useState([]);

  return (
    <div className="relative top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 ">
      <div className={`${activePanel === null ? "" : "hidden"} w-full h-full`}>
        <EditingPanel
          onSelectPanel={onSelectPanel}
          imageA={imageA}
          imageB={imageB}
          video={video}
          conversation={conversation}
        />
      </div>

      <div
        className={`${activePanel === "story" ? "" : "hidden"} w-full h-[87%] `}
      >
        <StoryPanel
          onSelectPanel={onSelectPanel}
          setConversation={setConversation}
        />
      </div>

      <div
        className={`${activePanel === "voices" ? "" : "hidden"} w-full h-full`}
      >
        <VoicesPanel onSelectPanel={onSelectPanel} />
      </div>

      <div
        className={`${
          activePanel === "characters" ? "" : "hidden"
        } w-full h-full `}
      >
        <CharactersPanel
          onSelectPanel={onSelectPanel}
          char1={imageA}
          char2={imageB}
          setChar1={setImageA}
          setChar2={setImageB}
        />
      </div>

      <div
        className={`${activePanel === "video" ? "" : "hidden"} w-full h-full`}
      >
        <VideoPanel
          onSelectPanel={onSelectPanel}
          video={video}
          setVideo={setVideo}
        />
      </div>
    </div>
  );
}
