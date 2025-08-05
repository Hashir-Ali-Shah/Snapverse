"use client";

import styles from "./voices.module.css";

export default function VoicesPanel() {
  const characters = Array.from({ length: 20 });

  return (
    <div className={`p-3 text-white h-[480px] flex flex-col overflow-hidden `}>
      <div className={`flex-1 overflow-y-auto ${styles.scrollContainer}`}>
        <div className={`grid grid-cols-4 gap-4 pr-2 `}>
          {characters.map((_, idx) => (
            <div key={idx} className={`p-2 rounded ${styles.card}`}>
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
