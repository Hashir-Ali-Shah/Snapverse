"use client";
import { useState } from "react";
import styles from "./voices.module.css";

export default function VoicesPanel({
  onSelectPanel,
}: {
  onSelectPanel: (panel: string) => void;
}) {
  const [voices, setVoices] = useState([
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ]);

  const voicesHandler = () => {
    onSelectPanel("voices");
  };

  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className={`grid grid-cols-4 gap-4  `}>
          {voices.map((value, idx) => (
            <div
              onClick={voicesHandler}
              key={idx}
              className={` rounded ${styles.card}`}
            >
              <img
                src={value}
                alt={`Character ${idx + 1}`}
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
