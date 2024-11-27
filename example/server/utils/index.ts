import crypto from 'crypto';

// Function to generate a unique API key
export const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};