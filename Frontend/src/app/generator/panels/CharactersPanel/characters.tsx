"use client";

import styles from "./characters.module.css";
import { useState } from "react";
export default function CharactersPanel({
  onSelectPanel,
}: {
  onSelectPanel: (panel: string) => void;
}) {
  const [characters, setCharacters] = useState([
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ]);
  const charactersHandler = () => {
    onSelectPanel("characters");
  };
  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className={`grid grid-cols-4 gap-4  `}>
          {characters.map((value, idx) => (
            <div
              onClick={charactersHandler}
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
