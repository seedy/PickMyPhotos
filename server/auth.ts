import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { after } from "next/server";
import { db } from "@/db";
import { env } from "@/env.mjs";
import { sendEmail } from "@/server/email";

export const auth = betterAuth({
	baseURL: "http://localhost:3000/",
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		sendResetPassword: async ({ user, url }) => {
			void after(async () => {
				await sendEmail({
					to: user.email,
					subject: "Reset your password",
					html: `Click the link to reset your password: ${url}`,
				});
			});
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			void after(async () => {
				await sendEmail({
					to: user.email,
					subject: "Verify your email address",
					html: `Click the link to verify your email: ${url}`,
				});
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
	},
	socialProviders: {
		facebook: {
			clientId: env.FACEBOOK_CLIENT_ID!,
			clientSecret: env.FACEBOOK_CLIENT_SECRET,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID!,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		linkedin: {
			clientId: env.LINKEDIN_CLIENT_ID!,
			clientSecret: env.LINKEDIN_CLIENT_SECRET,
		},
		microsoft: {
			clientId: env.MICROSOFT_CLIENT_ID!,
			clientSecret: env.MICROSOFT_CLIENT_SECRET,
		},
	},
	plugins: [nextCookies(), dash({ apiKey: env.BETTER_AUTH_API_KEY })],
	trustedOrigins: [env.BETTER_AUTH_URL],
});
