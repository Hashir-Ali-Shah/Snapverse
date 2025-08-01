'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ToolOverlay from './ToolOverlay';

export default function MainLayout() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handlePanelSelect = (panel: string) => {
    setActivePanel(panel === activePanel ? null : panel);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Sidebar onSelectPanel={handlePanelSelect} activePanel={activePanel} />
      <Canvas />
      <ToolOverlay activePanel={activePanel} />
    </div>
  );
}
