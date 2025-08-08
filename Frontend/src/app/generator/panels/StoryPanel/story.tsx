"use client";

import { useState } from "react";
import styles from "./story.module.css";
import {
  PaperAirplaneIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import { SiPoetry } from "react-icons/si";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export default function StoryPanel({
  onSelectPanel,
}: {
  onSelectPanel: (panel: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [copy, setCopy] = useState(false);

  const copyHandler = () => {
    navigator.clipboard.writeText(messages[messages.length - 1].content);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000); // Reset after 2 seconds
  };
  const storyHandler = () => {
    onSelectPanel("story");
    setInput(""); // Clear input when switching to story panel
    setMessages([]); // Optionally clear messages if needed
  };

  const handleConfirm = () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      { role: "user", content: input },
      {
        role: "ai",
        content: `This is a placeholder response to: "${input}"`,
      },
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInput("");
  };

  return (
    <div className="h-full w-full min-w-0 flex flex-col bg-[#1e1e1e] overflow-x-hidden">
      {/* Scrollable chat messages (bottom-up) */}
      <div
        className={`flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-4  ${styles.scrollContainer}`}
      >
        {messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[60%] ${
                msg.role === "user"
                  ? "bg-[#2d2d2d] text-gray-200 ml-auto"
                  : "bg-[#3a3a3a] text-blue-100 mr-auto"
              }`}
            >
              {msg.role === "user" ? (
                <>
                  <span className="text-xs opacity-70 block mb-1">You:</span>
                  <p className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs opacity-70">AI:</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(msg.content)}
                      className="text-[10px] text-blue-300 hover:underline"
                      title="Copy response"
                    >
                      <DocumentDuplicateIcon
                        className={`w-4 h-4 ${
                          copy ? "text-blue-400" : "text-gray-400"
                        }`}
                        onClick={copyHandler}
                      />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </>
              )}
            </div>
          ))}
      </div>

      {/* Input area (always visible) */}
      <div className="shrink-0 p-3 border-t border-[#333] bg-[#121212] flex items-center space-x-2">
        <textarea
          placeholder="Type your prompt..."
          className="flex-1 px-3 py-2 bg-[#1e1e1e] text-white border border-[#444] rounded-md resize-none overflow-y-auto leading-tight"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevents newline
              handleConfirm();
            }
          }}
          rows={1}
          style={{ maxHeight: "7.5rem" }} // 5 rows x 1.5rem line-height
        />

        {/* New Use Story Button */}
        <button
          onClick={storyHandler}
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
        >
          Use Story
        </button>

        <button
          onClick={handleConfirm}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!input.trim()}
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-315" />
        </button>
      </div>
    </div>
  );
}
