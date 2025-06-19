
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
    <div className="glass-effect border border-white/10 rounded-xl p-4">
      <div className="text-sm text-white/75 mb-3 font-medium">Choose your mode:</div>
      <div className="flex gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = currentMode === mode.id;
          
          return (
            <Button
              key={mode.id}
              onClick={() => onModeSelect(mode.id)}
              disabled={disabled}
              variant="ghost"
              className={`
                flex-1 h-14 flex flex-col items-center justify-center gap-1 text-white font-medium transition-all duration-200 border
                ${isSelected 
                  ? `bg-gradient-to-r ${mode.color} border-white/30 shadow-lg scale-105` 
                  : 'hover:bg-white/10 border-white/20 hover:border-white/30 hover:scale-102'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`${mode.label} mode: ${mode.description}`}
            >
              <Icon className={`w-4 h-4 transition-colors duration-200 ${isSelected ? 'text-white' : 'text-white/80'}`} />
              <span className={`text-xs transition-colors duration-200 ${isSelected ? 'text-white' : 'text-white/80'}`}>
                {mode.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
