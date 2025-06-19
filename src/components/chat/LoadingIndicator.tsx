
export function LoadingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="flex space-x-1">
        <div 
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}
        />
        <div 
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
      <span className="text-sm text-white/75">AI is thinking...</span>
    </div>
  );
}
