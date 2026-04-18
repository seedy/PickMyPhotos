"use server";

// Notice the import path is different from the client
import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form-nextjs";
import { registerFormOptions } from "@/models/form";

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
	...registerFormOptions,
	onServerValidate: ({ value }) => {
		if (value.email === "") {
			return "Server validation: empty email";
		}
	},
});

export default async function registerAction(formData: FormData) {
	try {
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
