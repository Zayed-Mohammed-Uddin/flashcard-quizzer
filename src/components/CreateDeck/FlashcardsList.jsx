import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";
import { FaPlus } from "react-icons/fa";
import {
	addCardToDraft,
	removeCardFromDraft,
	selectDraftCards,
} from "../../store/decksSlice";
import Button from "../../ui/Button";
import FlashcardsSection from "../../ui/FlashcardsSection";
import FlashcardsHeader from "../../ui/FlashcardsHeader";
import FlashcardsCount from "../../ui/FlashcardsCount";
import EmptyState from "../../ui/EmptyState";
import EmptyStateText from "../../ui/EmptyStateText";
import CardsList from "../../ui/CardsList";
import FlashcardItem from "./FlashCardItem";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import Input from "../../ui/Input";

function FlashcardsList({ mode = "create", cards = [], onCardAdd, onCardRemove }) {
	const dispatch = useDispatch();
	const draftCards = useSelector(selectDraftCards);
	
	// Use passed cards for edit mode, Redux state for create mode
	const cardsToShow = mode === "edit" ? cards : draftCards;
	const cardCount = cardsToShow.length;

	// Modal state
	const [open, setOpen] = useState(false);
	const {
		register: registerCard,
		handleSubmit: handleCardSubmit,
		reset: resetCardForm,
		formState: { errors: cardErrors },
	} = useForm({ mode: "onChange" });

	const onAddCard = (cardData) => {
		if (mode === "edit" && onCardAdd) {
			// Edit mode: use callback
			onCardAdd(cardData);
		} else {
			// Create mode: use Redux
			dispatch(addCardToDraft(cardData));
		}
		resetCardForm();
		setOpen(false);
	};

	const onRemoveCard = (id) => {
		if (mode === "edit" && onCardRemove) {
			// Edit mode: use callback
			onCardRemove(id);
		} else {
			// Create mode: use Redux
			dispatch(removeCardFromDraft(id));
		}
	};

	const openModal = () => setOpen(true);

	return (
		<FlashcardsSection>
			<FlashcardsHeader>
				<FlashcardsCount>Flashcards ({cardCount})</FlashcardsCount>
				<Button variant="primary" type="button" onClick={openModal}>
					<FaPlus className="w-4 h-4" />
					Add Card
				</Button>
			</FlashcardsHeader>

			{cardCount === 0 ? (
				<EmptyState>
					<EmptyStateText>
						No flashcards yet. Add your first card to get started!
					</EmptyStateText>
					<Button variant="ghost" type="button" onClick={openModal}>
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
						/>
					))}
				</CardsList>
			)}
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
					<Dialog.Content className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2 w-[350px]">
						<Dialog.Title className="text-lg font-bold mb-2">
							Add Card
						</Dialog.Title>
						<form onSubmit={handleCardSubmit(onAddCard)}>
							<FormGroup>
								<Label htmlFor="front">Front*</Label>
								<Input
									id="front"
									type="text"
									placeholder="Front of card"
									{...registerCard("front", {
										required: "Front is required",
									})}
									className={
										cardErrors.front ? "border-red-500" : ""
									}
								/>
								{cardErrors.front && (
									<p className="text-red-500 text-sm">
										{cardErrors.front.message}
									</p>
								)}
							</FormGroup>
							<FormGroup>
								<Label htmlFor="back">Back*</Label>
								<Input
									id="back"
									type="text"
									placeholder="Back of card"
									{...registerCard("back", {
										required: "Back is required",
									})}
									className={
										cardErrors.back ? "border-red-500" : ""
									}
								/>
								{cardErrors.back && (
									<p className="text-red-500 text-sm">
										{cardErrors.back.message}
									</p>
								)}
							</FormGroup>
							<div className="flex justify-end gap-2 mt-4">
								<Button
									variant="secondary"
									type="button"
									onClick={() => setOpen(false)}
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
		</FlashcardsSection>
	);
}

export default FlashcardsList;
