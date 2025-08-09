import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import {
	addCardToDraft,
	removeCardFromDraft,
	editCardInDraft,
	selectDraftCards,
} from "./slice/decksSlice";
import { MESSAGES, pluralize } from "../../utils";
import {
	Button,
	FlashcardsSection,
	FlashcardsHeader,
	FlashcardsCount,
	EmptyState,
	EmptyStateText,
	CardsList,
} from "../../ui";
import FlashcardItem from "./FlashCardItem";
import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";

function FlashcardsList({
	mode = "create",
	cards = [],
	onCardAdd,
	onCardRemove,
	onCardEdit,
}) {
	const dispatch = useDispatch();
	const draftCards = useSelector(selectDraftCards);

	const cardsToShow = mode === "edit" ? cards : draftCards;
	const cardCount = cardsToShow.length;

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingCard, setEditingCard] = useState(null);

	const onAddCard = (cardData) => {
		if (mode === "edit" && onCardAdd) {
			onCardAdd(cardData);
		} else {
			dispatch(addCardToDraft(cardData));
		}
	};

	const onRemoveCard = (id) => {
		if (mode === "edit" && onCardRemove) {
			onCardRemove(id);
		} else {
			dispatch(removeCardFromDraft(id));
		}
	};

	const onEditCard = (cardId, cardData) => {
		if (mode === "edit" && onCardEdit) {
			onCardEdit(cardId, cardData);
		} else {
			dispatch(editCardInDraft({ id: cardId, cardData }));
		}
	};

	const handleEditCard = (card) => {
		setEditingCard(card);
		setEditModalOpen(true);
	};

	const openAddModal = () => setAddModalOpen(true);

	return (
		<FlashcardsSection>
			<FlashcardsHeader>
				<FlashcardsCount>
					{pluralize(cardCount, "Flashcard")} ({cardCount})
				</FlashcardsCount>
				<Button variant="primary" type="button" onClick={openAddModal}>
					<FaPlus className="w-4 h-4" />
					Add Card
				</Button>
			</FlashcardsHeader>

			{cardCount === 0 ? (
				<EmptyState>
					<EmptyStateText>{MESSAGES.NO_CARDS}</EmptyStateText>
					<Button
						variant="ghost"
						type="button"
						onClick={openAddModal}
					>
						<FaPlus className="w-4 h-4" />
						Add First Card
					</Button>
				</EmptyState>
			) : (
				<CardsList>
					{cardsToShow.map((card) => (
						<FlashcardItem
							card={card}
							key={card.id}
							onRemove={onRemoveCard}
							onEdit={handleEditCard}
						/>
					))}
				</CardsList>
			)}
			<AddCardModal
				open={addModalOpen}
				onOpenChange={setAddModalOpen}
				onAddCard={onAddCard}
			/>
			<EditCardModal
				open={editModalOpen}
				onOpenChange={setEditModalOpen}
				onEditCard={onEditCard}
				card={editingCard}
			/>
		</FlashcardsSection>
	);
}

export default FlashcardsList;
