
import React from 'react';
import { MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from './ErrorBoundary';

interface ChatErrorFallbackProps {
  onRetry: () => void;
}

const ChatErrorFallback: React.FC<ChatErrorFallbackProps> = ({ onRetry }) => (
  <div className="h-full flex items-center justify-center p-6">
    <div className="text-center max-w-sm">
      <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="w-6 h-6 text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">Chat Error</h3>
      <p className="text-white/70 text-sm mb-4">
        The chat interface encountered an error. Please try again.
      </p>
      <Button 
        onClick={onRetry}
        size="sm"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Retry Chat
      </Button>
    </div>
  </div>
);

interface ChatErrorBoundaryProps {
  children: React.ReactNode;
  onRetry?: () => void;
}

export const ChatErrorBoundary: React.FC<ChatErrorBoundaryProps> = ({ 
  children, 
  onRetry = () => window.location.reload() 
}) => {
  return (
    <ErrorBoundary fallback={<ChatErrorFallback onRetry={onRetry} />}>
      {children}
    </ErrorBoundary>
  );
};
