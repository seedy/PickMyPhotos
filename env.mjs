import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
  },
  experimental__runtimeEnv: {
  },
  server: {
    ACCOUNT_ID: z.string().min(1),
    PHOTOS_RW_ACCESS_KEY_ID: z.string().min(1),
    PHOTOS_RW_SECRET_ACCESS_KEY: z.string().min(1),
    R2_PHOTOS_BUCKET: z.string().min(1)
  },
});
