import { env } from "@/env.mjs";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./db/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
