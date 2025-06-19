
import { useState } from "react";

export interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type ChatMode = "analysis" | "creative" | "strategy" | null;

export interface ChatStep {
  step: "idle" | "mode-selection" | "processing";
  data?: any;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to TerrificMarketingAI! I'm here to help you with data analysis, creative suggestions, and strategic recommendations. Please select a mode to get started:",
      timestamp: new Date(),
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>(null);
  const [chatStep, setChatStep] = useState<ChatStep>({ step: "mode-selection" });

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearInput = () => setInput("");

  return {
    messages,
    input,
    setInput,
    isLoading,
    setIsLoading,
    currentMode,
    setCurrentMode,
    chatStep,
    setChatStep,
    addMessage,
    clearInput,
  };
};
