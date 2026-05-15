"use server";

// Notice the import path is different from the client
import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form-nextjs";
import { REGISTER_SCHEMA, registerFormOptions } from "@/models/auth";

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
	...registerFormOptions,
	onServerValidate: ({ value }) => {
		const result = REGISTER_SCHEMA.safeParse(value);
		console.log(result);
		if (!result.success) return result.error;
		return;
	},
});

export default async function registerAction(
	prev: unknown,
	formData: FormData,
) {
	try {
		console.log("formData", formData);
		const validatedData = await serverValidate(formData);
		console.log("validatedData", validatedData);
		// Persist the form data to the database
		// await sql`
		//   INSERT INTO users (name, email, password)
		//   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
		// `
	} catch (e) {
		if (e instanceof ServerValidateError) {
			return e.formState;
		}

		// Some other error occurred while validating your form
		throw e;
	}

	// Your form has successfully validated!
}
