import { z } from 'zod';

export const Env = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof Env>;


declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}