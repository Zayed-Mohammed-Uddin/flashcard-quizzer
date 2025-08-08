import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaEdit, FaTrash } from "react-icons/fa";
import CardContent from "../../ui/CardContent";
import CardSide from "../../ui/CardSide";
import CardLabel from "../../ui/CardLabel";
import CardText from "../../ui/CardText";
import CardActions from "../../ui/CardActions";
import IconButton from "../../ui/IconButton";
import Button from "../../ui/Button";

function FlashcardItem({ card, onRemove }) {
	const [open, setOpen] = React.useState(false);

	const handleConfirmDelete = () => {
		onRemove(card.id);
		setOpen(false);
	};

	return (
		<CardContent>
			<CardSide>
				<CardLabel>Front</CardLabel>
				<CardText>{card.front}</CardText>
			</CardSide>
			<CardSide>
				<CardLabel>Back</CardLabel>
				<CardText>{card.back}</CardText>
			</CardSide>
			<CardActions>
				<IconButton type="edit" title="Edit card">
					<FaEdit className="w-4 h-4" />
				</IconButton>

				<AlertDialog.Root open={open} onOpenChange={setOpen}>
					<AlertDialog.Trigger asChild>
						<IconButton type="delete" title="Delete card">
							<FaTrash className="w-4 h-4" />
						</IconButton>
					</AlertDialog.Trigger>
					<AlertDialog.Portal>
						<AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
						<AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2 w-[400px]">
							<AlertDialog.Title className="text-lg font-bold mb-2">
								Delete Card
							</AlertDialog.Title>
							<AlertDialog.Description className="text-gray-600 mb-4">
								Are you sure you want to delete this card? This
								action cannot be undone.
							</AlertDialog.Description>
							<div className="flex justify-end gap-2">
								<AlertDialog.Cancel asChild>
									<Button variant="secondary">Cancel</Button>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<Button
										variant="destructive"
										onClick={handleConfirmDelete}
									>
										Delete
									</Button>
								</AlertDialog.Action>
							</div>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			</CardActions>
		</CardContent>
	);
}
export default FlashcardItem;
