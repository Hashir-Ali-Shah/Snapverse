'use client';

import StoryPanel from './panels/StoryPanel/story';
import VoicesPanel from './panels/VoicesPanel/voices';
import CharactersPanel from './panels/CharactersPanel/characters';
import VideoPanel from './panels/VideoPanel/video';
import EditingPanel from './panels/EditingPanel/editing';

export default function ToolOverlay({ activePanel }: { activePanel: string | null }) {
  return (
    <div className="relative top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
      {activePanel === null && <EditingPanel />}
      {activePanel === 'story' && <StoryPanel />}
      {activePanel === 'voices' && <VoicesPanel />}
      {activePanel === 'characters' && <CharactersPanel />}
      {activePanel === 'video' && <VideoPanel />}
    </div>
  );
}
