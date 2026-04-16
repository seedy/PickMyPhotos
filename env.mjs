import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {},
	experimental__runtimeEnv: {},
	server: {
		ACCOUNT_ID: z.string().min(1),
		PHOTOS_RW_ACCESS_KEY_ID: z.string().min(1),
		PHOTOS_RW_SECRET_ACCESS_KEY: z.string().min(1),
		R2_PHOTOS_BUCKET: z.string().min(1),
		DATABASE_URL: z.url().min(1),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.url().min(1),
		MAILER_HOST: z.string().min(1),
		MAILER_PASSWORD: z.string().min(1),
		MAILER_PORT: z.string().min(1),
		MAILER_USER: z.email(),
		FACEBOOK_CLIENT_ID: z.string().optional(),
		FACEBOOK_CLIENT_SECRET: z.string().optional(),
		GOOGLE_CLIENT_ID: z.string().optional(),
		GOOGLE_CLIENT_SECRET: z.string().optional(),
		LINKEDIN_CLIENT_ID: z.string().optional(),
		LINKEDIN_CLIENT_SECRET: z.string().optional(),
		MICROSOFT_CLIENT_ID: z.string().optional(),
		MICROSOFT_CLIENT_SECRET: z.string().optional(),
	},
});
