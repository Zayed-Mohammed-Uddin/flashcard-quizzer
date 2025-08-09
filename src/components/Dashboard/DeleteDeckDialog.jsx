import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaTrash } from "react-icons/fa";
import { Button, IconButton } from "../../ui";

function DeleteDeckDialog({ deck, onDelete, isDeleting }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDeleteClick = async () => {
		await onDelete();
		setIsDialogOpen(false);
	};

	return (
		<AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialog.Trigger asChild>
				<IconButton type="delete" title="Delete deck">
					<FaTrash className="w-4 h-4" />
				</IconButton>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
				<AlertDialog.Content
					className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg w-[400px]"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				>
					<AlertDialog.Title className="text-lg font-bold mb-2 text-red-600">
						Delete Deck
					</AlertDialog.Title>
					<AlertDialog.Description className="text-gray-600 mb-4">
						Are you sure you want to delete "{deck.name}"? This
						action cannot be undone and will permanently remove all{" "}
						{deck.cards.length} cards in this deck.
					</AlertDialog.Description>
					<div className="flex justify-end gap-2">
						<Button
							variant="secondary"
							disabled={isDeleting}
							onClick={() => setIsDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button
							variant="danger"
							onClick={handleDeleteClick}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete Deck"}
						</Button>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default DeleteDeckDialog;
