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
      case "task": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "anomaly": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "system": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-muted/50">
        <h3 className="font-semibold text-foreground flex items-center">
          <Bot className="w-5 h-5 mr-2 text-blue-600" />
          AI Assistant
        </h3>
        <p className="text-sm text-muted-foreground">Natural language interface for all operations</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-muted text-foreground"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.type === "user" ? (
                    <User className="w-4 h-4 mr-2" />
                  ) : (
                    getCategoryIcon(message.category)
                  )}
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.category && message.type === "assistant" && (
                    <Badge className={`ml-2 text-xs ${getCategoryColor(message.category)}`}>
                      {message.category}
                    </Badge>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to configure tasks, check status, or analyze data..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Try: "Start new A/B test", "Check for anomalies", "System status"
        </p>
      </div>
    </div>
  );
}
