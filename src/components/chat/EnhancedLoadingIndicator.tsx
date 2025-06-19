
import React from 'react';
import { Bot, Loader2 } from 'lucide-react';

interface EnhancedLoadingIndicatorProps {
  message?: string;
  showDots?: boolean;
}

export const EnhancedLoadingIndicator: React.FC<EnhancedLoadingIndicatorProps> = ({ 
  message = "AI is thinking...",
  showDots = true
}) => {
  return (
    <div className="flex items-start space-x-3 p-4">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
          <span className="text-white/70 text-sm">
            {message}
            {showDots && (
              <span className="inline-flex">
                <span className="animate-bounce delay-0">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
