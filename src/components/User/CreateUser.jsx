import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUsername } from "./slice/userSlice";
import { Form, FormGroup, Input, Label, Button } from "../../ui";

function CreateUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (data) => {
		dispatch(setUsername(data.username));

		const from = location.state?.from?.pathname || "/";
		navigate(from, { replace: true });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup>
				<Label htmlFor="username">
					Enter your username to get started
				</Label>
				<Input
					id="username"
					type="text"
					placeholder="Your username"
					{...register("username", {
						required: "Username is required",
						minLength: {
							value: 2,
							message: "Username must be at least 2 characters",
						},
						maxLength: {
							value: 50,
							message: "Username must be less than 50 characters",
						},
						pattern: {
							value: /^[a-zA-Z0-9_-]+$/,
							message:
								"Username can only contain letters, numbers, hyphens, and underscores",
						},
					})}
				/>
				{errors.username && (
					<p className="text-red-600 text-sm mt-1">
						{errors.username.message}
					</p>
				)}
			</FormGroup>

			<Button
				type="submit"
				variant="primary"
				size="lg"
				disabled={isSubmitting}
				className="w-full"
			>
				{isSubmitting ? "Getting Started..." : "Get Started"}
			</Button>
		</Form>
	);
}

export default CreateUser;
