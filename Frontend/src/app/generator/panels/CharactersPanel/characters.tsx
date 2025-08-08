"use client";

import styles from "./characters.module.css";

export default function CharactersPanel({
  onSelectPanel,
}: {
  onSelectPanel: (panel: string) => void;
}) {
  const characters = Array.from({ length: 20 });
  const charactersHandler = () => {
    onSelectPanel("characters");
  };
  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className={`grid grid-cols-4 gap-4 pr-2 `}>
          {characters.map((_, idx) => (
            <div
              onClick={charactersHandler}
              key={idx}
              className={`p-2 rounded ${styles.card}`}
            >
              <img
                src="/logo.png"
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
