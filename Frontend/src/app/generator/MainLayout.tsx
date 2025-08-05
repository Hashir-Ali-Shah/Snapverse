"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

import ToolOverlay from "./ToolOverlay";

export default function MainLayout() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handlePanelSelect = (panel: string) => {
    setActivePanel(panel === activePanel ? null : panel);
  };

  return (
    <div className="relative flex h-screen fixed inset-0  overflow-hidden">
      <Sidebar onSelectPanel={handlePanelSelect} activePanel={activePanel} />
      <ToolOverlay activePanel={activePanel} />
    </div>
  );
}
