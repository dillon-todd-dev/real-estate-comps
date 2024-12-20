import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
