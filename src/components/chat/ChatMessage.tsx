
import { Badge } from "@/components/ui/badge";
import { Bot, User, Settings, BarChart3, AlertTriangle } from "lucide-react";
import { Message } from "@/hooks/useChatState";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "task": return <Settings className="w-3 h-3" />;
      case "anomaly": return <AlertTriangle className="w-3 h-3" />;
      case "system": return <BarChart3 className="w-3 h-3" />;
      default: return <Bot className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "task": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "anomaly": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "system": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div
      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          message.type === "user"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
            : "glass-effect text-white"
        }`}
      >
        <div className="flex items-center mb-2">
          {message.type === "user" ? (
            <User className="w-4 h-4 mr-2" />
          ) : (
            getCategoryIcon(message.category)
          )}
          <span className="text-xs opacity-75 font-medium">
            {message.timestamp.toLocaleTimeString()}
          </span>
          {message.category && message.type === "assistant" && (
            <Badge className={`ml-2 text-xs border ${getCategoryColor(message.category)}`}>
              {message.category}
            </Badge>
          )}
        </div>
        <div className="whitespace-pre-wrap font-medium leading-relaxed">{message.content}</div>
      </div>
    </div>
  );
}
