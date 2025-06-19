
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";

import { useChatState } from "@/hooks/useChatState";
import { useChatHandlers } from "@/hooks/useChatHandlers";
import { ChatMessage } from "./chat/ChatMessage";
import { LoadingIndicator } from "./chat/LoadingIndicator";
import { ModeSelector } from "./chat/ModeSelector";
import { ChatInput } from "./chat/ChatInput";

export function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const {
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
  } = useChatState();

  const { handleSendMessage, handleModeSelection } = useChatHandlers({
    input,
    currentMode,
    chatStep,
    isLoading,
    setIsLoading,
    setChatStep,
    addMessage,
    clearInput,
  });

  const onModeSelect = (mode: typeof currentMode) => {
    setCurrentMode(mode);
    handleModeSelection(mode);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Chat Header */}
      <div className="h-16 glass-effect border-b border-white/10 flex items-center px-6 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="font-semibold text-white text-lg">AI Assistant</h3>
            {currentMode && (
              <p className="text-sm text-white/65 capitalize">{currentMode} Mode Active</p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 bg-transparent" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>

      {/* Mode Selector - Always visible above input */}
      <div className="px-6 pb-4 bg-transparent">
        <ModeSelector 
          currentMode={currentMode}
          onModeSelect={onModeSelect}
          disabled={isLoading}
        />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={
          !currentMode 
            ? "Please select a mode first to start chatting..."
            : chatStep.step === "sheet-selection"
            ? "Enter the number of the sheet you want to analyze..."
            : "Ask me anything based on your selected mode..."
        }
      />
    </div>
  );
}
