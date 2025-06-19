
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
      onSend();
    }
  };

  return (
    <div className="p-6 border-t border-white/10 glass-effect">
      <div className="flex space-x-3">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Type your message here... (Press Enter to send, Shift+Enter for new line)"}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="flex-1 min-h-[60px] max-h-32 glass-effect border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 bg-background/50 text-white placeholder:text-white/50 resize-none"
        />
        <Button 
          onClick={onSend} 
          disabled={disabled || !value.trim()}
          className="self-end bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover-glow"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
