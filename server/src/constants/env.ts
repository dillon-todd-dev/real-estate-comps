const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '3004');
export const MONGO_URL = getEnv('MONGO_URL');
export const APP_ORIGIN = getEnv('APP_ORIGIN');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
export const RESEND_API_KEY = getEnv('RESEND_API_KEY');
export const EMAIL_SENDER = getEnv('EMAIL_SENDER');