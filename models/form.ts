import { formOptions } from "@tanstack/react-form-nextjs";
import { auth } from "@/server/auth";

type Provider = keyof typeof auth.options.socialProviders | "emailAndPassword";

export const registerFormOptions = formOptions({
	defaultValues: {
		provider: "emailAndPassword" satisfies Provider,
		email: "",
	},
});
