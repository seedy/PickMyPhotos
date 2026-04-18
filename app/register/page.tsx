import {
	initialFormState,
	mergeForm,
	useForm,
	useStore,
	useTransform,
} from "@tanstack/react-form-nextjs";
import { useActionState } from "react";
import { registerFormOptions } from "@/models/form";
import registerAction from "@/server/register/action";

export default function Register() {
	const [state, action] = useActionState(registerAction, initialFormState);

	const form = useForm({
		...registerFormOptions,
		transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);

	return (
		<form action={action} onSubmit={form.handleSubmit}>
			{formErrors.map((error) => (
				<p key={error}>{error}</p>
			))}
			<form.Field
				name="email"
				validators={{
					onChange: ({ value }) =>
						value === ""
							? "Client validation: You must be at least 8"
							: undefined,
				}}
			>
				{(field) => {
					return (
						<div>
							<input
								name={field.name} // must explicitly set the name attribute for the POST request
								type="number"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.map((error) => (
								<p key={error as string}>{error}</p>
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
