
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ value, onChange, onSend, disabled, placeholder }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const canSend = value.trim() && !disabled;

  return (
    <div className="p-4 md:p-6 border-t border-white/10 glass-effect backdrop-blur-xl">
      <div className="flex space-x-2 md:space-x-3">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Type your message here... (Press Enter to send, Shift+Enter for new line)"}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          className="flex-1 min-h-[50px] md:min-h-[60px] max-h-32 glass-effect border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 bg-black/20 text-white placeholder:text-white/50 resize-none text-sm md:text-base transition-all duration-200"
          aria-label="Chat input"
        />
        <Button 
          onClick={onSend} 
          disabled={!canSend}
          className={`self-end h-[50px] md:h-auto px-3 md:px-4 transition-all duration-200 ${
            canSend 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:scale-105' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
