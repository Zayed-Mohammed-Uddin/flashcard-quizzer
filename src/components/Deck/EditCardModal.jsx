import { useForm } from "react-hook-form";
import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../ui/Button";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import Input from "../../ui/Input";

function EditCardModal({ open, onOpenChange, onEditCard, card }) {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	useEffect(() => {
		if (open && card) {
			setValue("front", card.front);
			setValue("back", card.back);
		}
	}, [open, card, setValue]);

	const onSubmit = (cardData) => {
		onEditCard(card.id, cardData);
		reset();
		onOpenChange(false);
	};

	const handleCancel = () => {
		reset();
		onOpenChange(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2 w-[350px]">
					<Dialog.Title className="text-lg font-bold mb-2">
						Edit Card
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
								onClick={handleCancel}
							>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								Save Changes
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default EditCardModal;
