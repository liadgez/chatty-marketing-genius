
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ValidationErrorProps {
  message: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-2 text-red-400 text-sm p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
