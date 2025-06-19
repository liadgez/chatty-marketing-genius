
export const validateChatInput = (input: string): { isValid: boolean; error?: string } => {
  // Remove whitespace for validation
  const trimmedInput = input.trim();
  
  // Check if empty
  if (!trimmedInput) {
    return { isValid: false, error: "Message cannot be empty" };
  }
  
  // Check minimum length
  if (trimmedInput.length < 1) {
    return { isValid: false, error: "Message is too short" };
  }
  
  // Check maximum length
  if (trimmedInput.length > 2000) {
    return { isValid: false, error: "Message is too long (max 2000 characters)" };
  }
  
  // Check for potentially harmful content patterns
  const harmfulPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi
  ];
  
  for (const pattern of harmfulPatterns) {
    if (pattern.test(trimmedInput)) {
      return { isValid: false, error: "Invalid content detected" };
    }
  }
  
  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .slice(0, 2000); // Ensure max length
};
