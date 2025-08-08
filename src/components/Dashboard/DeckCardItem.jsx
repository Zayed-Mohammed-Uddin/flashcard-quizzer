import { FaEdit, FaTrash, FaCalendarAlt, FaPlay } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { deleteDeck } from "../Deck/slice/decksSlice";
import { deleteDeck as deleteDeckApi } from "../../services/deckApi";
import Card from "../../ui/Card";
import CardHeader from "../../ui/CardHeader";
import CardTitle from "../../ui/CardTitle";
import CardActions from "../../ui/CardActions";
import IconButton from "../../ui/IconButton";
import Description from "../../ui/Description";
import MetaInfo from "../../ui/MetaInfo";
import DateInfo from "../../ui/DateInfo";
import CardStats from "../../ui/CardStats";
import StatBadge from "../../ui/StatBadge";
import ReviewButton from "../../ui/ReviewButton";
import Button from "../../ui/Button";

function DeckCardItem({ deck }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const totalCards = deck.cards.length;
	const dueCards = deck.cards.filter(
		(card) => card.nextReview <= Date.now()
	).length;
	const createdDate = new Date(deck.createdAt).toLocaleDateString();
	const updatedDate = deck.updatedAt
		? new Date(deck.updatedAt).toLocaleDateString()
		: null;

	const handleEditDeck = () => {
		navigate(`/edit-deck/${deck.id}`);
	};

	const handleDeleteClick = async () => {
		setIsDeleting(true);
		try {
			await deleteDeckApi(deck.id);
		} catch (error) {
			if (
				error.message.includes("404") ||
				error.message.includes("Not Found")
			) {
				console.error("Failed to delete deck:", error);
				setIsDeleting(false);
				return;
			}
		}
		dispatch(deleteDeck(deck.id));
		setIsDialogOpen(false);
		setIsDeleting(false);
	};

	const handleStartQuiz = () => {
		navigate(`/quiz-deck/${deck.id}`);
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>{deck.name}</CardTitle>
					<CardActions>
						<IconButton
							type="edit"
							title="Edit deck"
							onClick={handleEditDeck}
						>
							<FaEdit className="w-4 h-4" />
						</IconButton>
						<AlertDialog.Root
							open={isDialogOpen}
							onOpenChange={setIsDialogOpen}
						>
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
										Are you sure you want to delete "
										{deck.name}"? This action cannot be
										undone and will permanently remove all{" "}
										{totalCards} cards in this deck.
									</AlertDialog.Description>
									<div className="flex justify-end gap-2">
										<Button
											variant="secondary"
											disabled={isDeleting}
											onClick={() =>
												setIsDialogOpen(false)
											}
										>
											Cancel
										</Button>
										<Button
											variant="danger"
											onClick={handleDeleteClick}
											disabled={isDeleting}
										>
											{isDeleting
												? "Deleting..."
												: "Delete Deck"}
										</Button>
									</div>
								</AlertDialog.Content>
							</AlertDialog.Portal>
						</AlertDialog.Root>
					</CardActions>
				</CardHeader>

				<Description>{deck.description}</Description>

				<MetaInfo>
					<DateInfo>
						<FaCalendarAlt className="w-3 h-3" />
						Created {createdDate}
						{deck.updatedAt && (
							<span className="ms-3 text-gray-500 text-sm">
								<GrUpdate className="inline-block w-3 h-3 mr-1" />
								Updated {updatedDate}
							</span>
						)}
					</DateInfo>
				</MetaInfo>

				<CardStats>
					<StatBadge type="total">{totalCards} cards</StatBadge>
					<StatBadge type="due">{dueCards} due for review</StatBadge>
				</CardStats>

				<ReviewButton
					variant="primary"
					size="default"
					onClick={handleStartQuiz}
				>
					<FaPlay className="w-3 h-3" />
					Review {dueCards} Cards
				</ReviewButton>
			</Card>
		</>
	);
}

export default DeckCardItem;
