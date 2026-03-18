"use client";

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
}

const ChatMessage = ({ content, role, timestamp }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={{
          backgroundColor: isUser ? "hsl(263 70% 76% / 0.2)" : "hsl(240 4% 16%)",
          color: "hsl(0 0% 98%)",
          borderRadius: isUser ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
        }}
      >
        <p style={{ color: "hsl(0 0% 98%)" }}>{content}</p>
        {timestamp && (
          <span style={{ color: "hsl(240 4% 48%)", fontSize: "10px", display: "block", marginTop: "4px" }}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;