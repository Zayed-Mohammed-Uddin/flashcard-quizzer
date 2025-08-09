import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DeckDetailsForm from "./DeckDetailsForm";
import FlashcardsList from "./FlashcardsList";
import {
	Button,
	ContentLayout,
	ContentHeader,
	Heading,
	SubText,
} from "../../ui";

function EditDeckPage() {
	const navigate = useNavigate();
	const { deck } = useLoaderData();

	const [editCards, setEditCards] = useState(deck.cards || []);

	const handleBack = () => {
		navigate("/");
	};

	const handleCardAdd = (cardData) => {
		const newCard = {
			...cardData,
			id: Date.now().toString(),
		};
		setEditCards((prev) => [...prev, newCard]);
	};

	const handleCardRemove = (cardId) => {
		setEditCards((prev) => prev.filter((card) => card.id !== cardId));
	};

	const handleCardEdit = (cardId, cardData) => {
		setEditCards((prev) =>
			prev.map((card) =>
				card.id === cardId ? { ...card, ...cardData } : card
			)
		);
	};

	return (
		<>
			<Button variant="back" onClick={handleBack}>
				<FaArrowLeft className="w-4 h-4" />
				Back to Decks
			</Button>

			<ContentHeader type="vertical">
				<Heading as="h1">Edit Deck</Heading>
				<SubText>
					Update your deck details and manage flashcards.
				</SubText>
			</ContentHeader>

			<ContentLayout>
				<DeckDetailsForm
					mode="edit"
					initialData={{ ...deck, cards: editCards }}
				/>
				<FlashcardsList
					mode="edit"
					cards={editCards}
					onCardAdd={handleCardAdd}
					onCardRemove={handleCardRemove}
					onCardEdit={handleCardEdit}
				/>
			</ContentLayout>
		</>
	);
}

export default EditDeckPage;
