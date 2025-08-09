import { FaEdit, FaTrash } from "react-icons/fa";
import {
	CardContent,
	CardLabel,
	CardText,
	CardActions,
	IconButton,
	AlertDialog,
} from "../../ui";

function FlashcardItem({ card, onRemove, onEdit }) {
	const handleConfirmDelete = () => {
		onRemove(card.id);
	};

	const handleEdit = () => {
		onEdit(card);
	};

	return (
		<CardContent>
			<div>
				<CardLabel>Front</CardLabel>
				<CardText>{card.front}</CardText>
			</div>

			<div>
				<CardLabel>Back</CardLabel>
				<CardText>{card.back}</CardText>
			</div>

			<CardActions>
				<IconButton type="edit" title="Edit card" onClick={handleEdit}>
					<FaEdit className="w-4 h-4" />
				</IconButton>

				<AlertDialog
					trigger={
						<IconButton type="delete" title="Delete card">
							<FaTrash className="w-4 h-4" />
						</IconButton>
					}
					title="Delete Card"
					description="Are you sure you want to delete this card? This action cannot be undone."
					onConfirm={handleConfirmDelete}
					confirmText="Delete"
					cancelText="Cancel"
					confirmVariant="destructive"
				/>
			</CardActions>
		</CardContent>
	);
}
export default FlashcardItem;
