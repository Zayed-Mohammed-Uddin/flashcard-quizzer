import { useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "./";

function AlertDialog({
	trigger,
	title,
	description,
	onConfirm,
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmVariant = "destructive",
}) {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};

	return (
		<AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
			<AlertDialogPrimitive.Trigger asChild>
				{trigger}
			</AlertDialogPrimitive.Trigger>
			<AlertDialogPrimitive.Portal>
				<AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
				<AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2 w-[400px]">
					<AlertDialogPrimitive.Title className="text-lg font-bold mb-2">
						{title}
					</AlertDialogPrimitive.Title>
					<AlertDialogPrimitive.Description className="text-gray-600 mb-4">
						{description}
					</AlertDialogPrimitive.Description>
					<div className="flex justify-end gap-2">
						<AlertDialogPrimitive.Cancel asChild>
							<Button variant="secondary">{cancelText}</Button>
						</AlertDialogPrimitive.Cancel>
						<AlertDialogPrimitive.Action asChild>
							<Button
								variant={confirmVariant}
								onClick={handleConfirm}
							>
								{confirmText}
							</Button>
						</AlertDialogPrimitive.Action>
					</div>
				</AlertDialogPrimitive.Content>
			</AlertDialogPrimitive.Portal>
		</AlertDialogPrimitive.Root>
	);
}

export default AlertDialog;
