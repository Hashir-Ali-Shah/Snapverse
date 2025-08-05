"use client";

import StoryPanel from "./panels/StoryPanel/story";
import VoicesPanel from "./panels/VoicesPanel/voices";
import CharactersPanel from "./panels/CharactersPanel/characters";
import VideoPanel from "./panels/VideoPanel/video";
import EditingPanel from "./panels/EditingPanel/editing";

export default function ToolOverlay({
  activePanel,
}: {
  activePanel: string | null;
}) {
  return (
    <div className="relative top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 ">
      <div className={`${activePanel === null ? "" : "hidden"} w-full h-full`}>
        <EditingPanel />
      </div>

      <div
        className={`${activePanel === "story" ? "" : "hidden"} w-full h-[87%] `}
      >
        <StoryPanel />
      </div>

      <div
        className={`${activePanel === "voices" ? "" : "hidden"} w-full h-full`}
      >
        <VoicesPanel />
      </div>

      <div
        className={`${
          activePanel === "characters" ? "" : "hidden"
        } w-full h-full `}
      >
        <CharactersPanel />
      </div>

      <div
        className={`${activePanel === "video" ? "" : "hidden"} w-full h-full`}
      >
        <VideoPanel />
      </div>
    </div>
  );
}
