'use client';

import { useState } from 'react';
import styles from './story.module.css';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function StoryPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleConfirm = () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      { role: 'user', content: input },
      {
        role: 'ai',
        content: `This is a placeholder response to: "${input}"`,
      },
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInput('');
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#1e1e1e]">
      {/* Scrollable chat messages (bottom-up) */}
      <div
        className={`flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-4 ${styles.scrollContainer}`}
      >
        {messages.slice().reverse().map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-[#2d2d2d] text-gray-200 ml-auto'
                : 'bg-[#3a3a3a] text-blue-100 mr-auto'
            }`}
          >
            <span className="text-xs opacity-70 block mb-1">
              {msg.role === 'user' ? 'You' : 'AI'}:
            </span>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input area (always visible) */}
      <div className="shrink-0 p-3 border-t border-[#333] bg-[#121212] flex items-center space-x-2">
<input
  type="text"
  placeholder="Type your prompt..."
  className="flex-1 px-3 py-2 bg-[#1e1e1e] text-white border border-[#444] rounded-md"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleConfirm();
  }}
/>
<button
  onClick={handleConfirm}
  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
  disabled={!input.trim()}
>
  <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
</button>

      </div>
    </div>
  );
}
