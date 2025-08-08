"use client";

import styles from "./characters.module.css";
import { useState } from "react";
export default function CharactersPanel({
  onSelectPanel,
  char1,
  char2,
  setChar1,
  setChar2,
}: {
  onSelectPanel: (panel: string) => void;
  char1: string;
  char2: string;
  setChar1: (value: string) => void;
  setChar2: (value: string) => void;
}) {
  const [characters, setCharacters] = useState([
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ]);
  const charactersHandler = (value: string) => {
    if (char1 === "") {
      setChar1(value);
    } else if (char2 === "") {
      setChar2(value);
      onSelectPanel("characters");
    } else if (char1 === value) {
      setChar1("");
    } else if (char2 === value) {
      setChar2("");
    } else {
      setChar1(value);
      setChar2("");
    }
  };
  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className={`grid grid-cols-4 gap-4`}>
          {characters.map((value, idx) => (
            <div
              onClick={() => charactersHandler(value)}
              key={idx}
              className={`rounded ${styles.card} ${
                value === char1 || value === char2
                  ? "ring-4 ring-yellow-400"
                  : ""
              }`}
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
