import { formOptions } from "@tanstack/react-form-nextjs";
import z from "zod";

export const PROVIDERS = [
	"facebook",
	"google",
	"linkedin",
	"microsoft",
	"emailAndPassword",
];
export type Provider = (typeof PROVIDERS)[number];

export const registerFormOptions = formOptions({
	defaultValues: {
		provider: "emailAndPassword" satisfies Provider,
		email: "",
		password: "",
	},
});

export const SERVER_REGISTER_SCHEMA = z.object({
	provider: z.enum(PROVIDERS),
	email: z.email().min(1),
});

export const REGISTER_SCHEMA = SERVER_REGISTER_SCHEMA.extend({
	password: z.string().min(1),
});
