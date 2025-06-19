
import { useState } from 'react';
import { validateChatInput, sanitizeInput } from '@/utils/validation';

export const useChatValidation = () => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateAndSanitize = (input: string): { isValid: boolean; sanitizedInput: string } => {
    const validation = validateChatInput(input);
    
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid input');
      return { isValid: false, sanitizedInput: input };
    }
    
    setValidationError(null);
    const sanitizedInput = sanitizeInput(input);
    return { isValid: true, sanitizedInput };
  };

  const clearValidationError = () => {
    setValidationError(null);
  };

  return {
    validationError,
    validateAndSanitize,
    clearValidationError
  };
};
