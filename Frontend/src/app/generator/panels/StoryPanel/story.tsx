"use client";

import { useState } from "react";
import styles from "./story.module.css";
import {
  PaperAirplaneIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export default function StoryPanel({
  onSelectPanel,
  setConversation,
}: {
  onSelectPanel: (panel: string) => void;
  setConversation: (
    value: { id: number; speaker: string; text: string }[]
  ) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false); // <-- loading state

  const copyHandler = () => {
    navigator.clipboard.writeText(messages[messages.length - 1].content);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };
  const conversationHandler = (content: string) => {
    return content
      .trim()
      .split("\n") // split by line
      .filter((line) => line.trim() !== "") // remove empty lines
      .map((line, index) => ({
        id: index + 1,
        speaker: index % 2 === 0 ? "A" : "B",
        text: line.trim(),
      }));
  };

  const storyHandler = () => {
    if (messages.length < 2) return; // Ensure we have at least one user message and one AI response
    setConversation(conversationHandler(messages[messages.length - 1].content));
    onSelectPanel("story");
    setInput("");
  };

  const handleConfirm = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);

    // Add user + placeholder AI in one go
    const userMsg: ChatMessage = { role: "user", content: input };
    const aiPlaceholder: ChatMessage = { role: "ai", content: "..." };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();

      // Replace placeholder AI message with real one
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "ai", content: data.answer };
        return updated;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full min-w-0 flex flex-col bg-[#1e1e1e] overflow-x-hidden">
      {/* Scrollable chat messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-4 ${styles.scrollContainer}`}
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
                    {!loading && (
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(msg.content)
                        }
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
                    )}
                  </div>
                  {loading && index === 0 ? (
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300"></span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
      </div>

      {/* Input area */}
      <div className="shrink-0 p-3 border-t border-[#333] bg-[#121212] flex items-center space-x-2">
        <textarea
          placeholder="Type your prompt..."
          className="flex-1 px-3 py-2 bg-[#1e1e1e] text-white border border-[#444] rounded-md resize-none overflow-y-auto leading-tight"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleConfirm();
            }
          }}
          rows={1}
          style={{ maxHeight: "7.5rem" }}
        />

        <button
          onClick={storyHandler}
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
        >
          Use Story
        </button>

        <button
          onClick={handleConfirm}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!input.trim() || loading}
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-315" />
        </button>
      </div>
    </div>
  );
}
