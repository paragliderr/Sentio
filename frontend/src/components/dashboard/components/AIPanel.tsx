"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

const mockResponses = [
  "I can help you with model configuration, dataset management, or project setup. What would you like to know?",
  "Your current model is performing well. The accuracy has improved by 3.2% since the last training run.",
  "To optimize your training pipeline, consider adjusting the learning rate and batch size in the Studio.",
  "I've analyzed your dataset — there are 12 potential outliers that might affect model performance.",
  "You can export your model in ONNX, TensorFlow, or PyTorch formats from the Projects page.",
];

const AIPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, content: "Hello! I'm Sentio AI. How can I help you today?", role: "assistant", timestamp: "now" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), content: input, role: "user", timestamp: "now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((prev) => [...prev, { id: Date.now(), content: response, role: "assistant", timestamp: "now" }]);
    }, 800);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex w-[380px] flex-col rounded-2xl shadow-2xl"
      style={{
        height: "520px",
        backgroundColor: "hsl(240 6% 8%)",
        border: "1px solid hsl(240 4% 18%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
        style={{
          backgroundColor: "hsl(240 6% 10%)",
          borderBottom: "1px solid hsl(240 4% 16%)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4" style={{ color: "hsl(263 70% 76%)" }} />
          <span className="text-sm font-semibold" style={{ color: "hsl(0 0% 98%)" }}>
            Sentio AI
          </span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: "hsl(240 4% 48%)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "hsl(160 68% 40%)" }} />
            Online
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 transition-colors"
          style={{ color: "hsl(240 4% 48%)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(240 4% 16%)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-3">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} content={msg.content} role={msg.role} timestamp={msg.timestamp} />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div
        className="px-3 py-3 rounded-b-2xl"
        style={{ borderTop: "1px solid hsl(240 4% 16%)" }}
      >
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{
            backgroundColor: "hsl(240 4% 12%)",
            border: "1px solid hsl(240 4% 18%)",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your model..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: "hsl(0 0% 98%)",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-lg p-1.5 transition-colors disabled:opacity-30"
            style={{ color: "hsl(263 70% 76%)" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPanel;