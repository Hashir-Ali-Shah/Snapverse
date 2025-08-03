'use client';

import styles from './Sidebar.module.css';

const options = ['story', 'video', 'voices', 'characters'];

type SidebarProps = {
  onSelectPanel: (panel: string) => void;
  activePanel: string | null;
};

export default function Sidebar({ onSelectPanel, activePanel }: SidebarProps) {
  return (
    <div className="h-screen w-36 bg-gray-900 text-white flex flex-col items-center py-6 gap-4">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelectPanel(option)}
          className={`w-full px-4 py-3 rounded-md text-base font-semibold text-center hover:bg-gray-700 ${
            activePanel === option ? 'bg-blue-600' : ''
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
