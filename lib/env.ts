import { z } from "zod";

const envSchema = z.object({
  REDIS_URL: z.string().default("redis://localhost:6379"),
  DATABASE_URL: z.string().min(1),
  FEATURE_PLAYWRIGHT_FALLBACK: z.string().default("false"),
  WORKER_CONCURRENCY: z.string().optional(),
  PSI_API_KEY: z.string().optional(),
  GSC_CLIENT_ID: z.string().optional(),
  GSC_CLIENT_SECRET: z.string().optional(),
  GSC_REDIRECT_URI: z.string().optional()
});

export const ENV = envSchema.parse(process.env);