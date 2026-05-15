"use client";

import {
	initialFormState,
	mergeForm,
	useForm,
	useTransform,
} from "@tanstack/react-form-nextjs";
import { useActionState } from "react";
import { REGISTER_SCHEMA, registerFormOptions } from "@/models/auth";
import registerAction from "@/server/register/action";

export default function Register() {
	const [state, action] = useActionState(registerAction, initialFormState);

	const form = useForm({
		...registerFormOptions,
		transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
		validators: { onSubmit: REGISTER_SCHEMA },
	});

	return (
		<form action={action} onSubmit={form.handleSubmit}>
			<form.Field name="email">
				{(field) => {
					return (
						<div>
							<input
								name={field.name} // must explicitly set the name attribute for the POST request
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.map((error) => (
								<p key={error?.path?.join(".")}>{error?.message}</p>
							))}
						</div>
					);
				}}
			</form.Field>
			<form.Field name="password">
				{(field) => {
					return (
						<div>
							<input
								name={field.name} // must explicitly set the name attribute for the POST request
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.map((error) => (
								<p key={error?.path?.join(".")}>{error?.message}</p>
							))}
						</div>
					);
				}}
			</form.Field>
			<form.Subscribe
				selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<button type="submit" disabled={!canSubmit}>
						{isSubmitting ? "..." : "Submit"}
					</button>
				)}
			</form.Subscribe>
		</form>
	);
}
