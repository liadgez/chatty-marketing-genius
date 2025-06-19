
import { Button } from "@/components/ui/button";
import { BarChart3, Lightbulb, Target } from "lucide-react";
import { ChatMode } from "@/hooks/useChatState";

interface ModeSelectorProps {
  currentMode: ChatMode;
  onModeSelect: (mode: ChatMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ currentMode, onModeSelect, disabled }: ModeSelectorProps) {
  const modes = [
    {
      id: "analysis" as const,
      label: "Analysis",
      icon: BarChart3,
      description: "Data analysis & insights",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      id: "creative" as const,
      label: "Creative",
      icon: Lightbulb,
      description: "Ideas & content creation",
      color: "from-purple-600 to-purple-700"
    },
    {
      id: "strategy" as const,
      label: "Strategy",
      icon: Target,
      description: "Strategic recommendations",
      color: "from-orange-600 to-orange-700"
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 p-4 glass-effect border border-white/10 rounded-xl">
      <div className="w-full text-sm text-white/75 mb-2">Choose your mode:</div>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = currentMode === mode.id;
        
        return (
          <Button
            key={mode.id}
            onClick={() => onModeSelect(mode.id)}
            disabled={disabled}
            className={`
              flex-1 min-w-32 h-16 flex flex-col items-center justify-center gap-1 text-white font-medium
              ${isSelected 
                ? `bg-gradient-to-r ${mode.color} shadow-lg shadow-blue-500/25` 
                : 'glass-effect hover:bg-white/10 border border-white/20'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs">{mode.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
