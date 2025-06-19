
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Settings, BarChart3, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: "task" | "anomaly" | "system" | "general";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to TerrificMarketingAI! I'm here to help you configure tasks, monitor experiments, and analyze your marketing data. What would you like to work on today?",
      timestamp: new Date(),
      category: "general"
    }
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAssistantResponse(input),
        timestamp: new Date(),
        category: getMessageCategory(input)
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInput("");
  };

  const getAssistantResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("experiment") || input.includes("a/b test")) {
      return "I'll help you set up a new A/B test experiment. Please provide:\n1. Campaign name\n2. Test variants (A and B)\n3. Target metrics\n4. Duration\n5. Traffic allocation\n\nWhat's the name of your campaign?";
    }
    
    if (input.includes("anomaly") || input.includes("detect")) {
      return "I've initiated anomaly detection on your data streams. Current status:\n• Revenue metrics: ✅ Normal\n• Traffic patterns: ⚠️ Minor deviation detected\n• Conversion rates: ✅ Normal\n\nWould you like me to investigate the traffic pattern anomaly?";
    }
    
    if (input.includes("status") || input.includes("progress")) {
      return "Current system status:\n• Active experiments: 24\n• Running tasks: 3\n• Agent utilization: 67%\n• Data quality: 95.7%\n\nAll systems are operating normally. Recent task 'Campaign 2024-Q2 Analysis' completed successfully.";
    }
    
    return "I understand you're looking for assistance with marketing analytics. I can help with:\n• Setting up A/B tests\n• Anomaly detection\n• Data quality checks\n• Performance optimization\n• Report generation\n\nCould you be more specific about what you'd like to accomplish?";
  };

  const getMessageCategory = (input: string): "task" | "anomaly" | "system" | "general" => {
    const inputLower = input.toLowerCase();
    if (inputLower.includes("experiment") || inputLower.includes("test")) return "task";
    if (inputLower.includes("anomaly") || inputLower.includes("detect")) return "anomaly";
    if (inputLower.includes("status") || inputLower.includes("system")) return "system";
    return "general";
  };

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

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 glass-effect">
        <h3 className="font-semibold text-white flex items-center text-lg">
          <Bot className="w-6 h-6 mr-3 text-blue-400" />
          AI Assistant
        </h3>
        <p className="text-sm text-white/65 mt-1">Natural language interface for all operations</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
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
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t border-white/10 glass-effect">
        <div className="flex space-x-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to configure tasks, check status, or analyze data..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 glass-effect border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 bg-background/50 text-white placeholder:text-white/50"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-white/65 mt-3 font-medium">
          Try: "Start new A/B test", "Check for anomalies", "System status"
        </p>
      </div>
    </div>
  );
}
