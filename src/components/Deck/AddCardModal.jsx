import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../ui/Button";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import Input from "../../ui/Input";

function AddCardModal({ open, onOpenChange, onAddCard }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = (cardData) => {
		onAddCard(cardData);
		reset();
		onOpenChange(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2 w-[350px]">
					<Dialog.Title className="text-lg font-bold mb-2">
						Add Card
					</Dialog.Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormGroup>
							<Label htmlFor="front">Front*</Label>
							<Input
								id="front"
								type="text"
								placeholder="Front of card"
								{...register("front", {
									required: "Front is required",
								})}
								className={errors.front ? "border-red-500" : ""}
							/>
							{errors.front && (
								<p className="text-red-500 text-sm">
									{errors.front.message}
								</p>
							)}
						</FormGroup>
						<FormGroup>
							<Label htmlFor="back">Back*</Label>
							<Input
								id="back"
								type="text"
								placeholder="Back of card"
								{...register("back", {
									required: "Back is required",
								})}
								className={errors.back ? "border-red-500" : ""}
							/>
							{errors.back && (
								<p className="text-red-500 text-sm">
									{errors.back.message}
								</p>
							)}
						</FormGroup>
						<div className="flex justify-end gap-2 mt-4">
							<Button
								variant="secondary"
								type="button"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								Add
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default AddCardModal;
