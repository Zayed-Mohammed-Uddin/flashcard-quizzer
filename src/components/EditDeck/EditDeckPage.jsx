import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DeckDetailsForm from "../CreateDeck/DeckDetailsForm";
import FlashcardsList from "../CreateDeck/FlashcardsList";
import BackButton from "../../ui/BackButton";
import ContentLayout from "../../ui/ContentLayout";
import ContentHeader from "../../ui/ContentHeader";
import Heading from "../../ui/Heading";
import SubText from "../../ui/SubText";

function EditDeckPage() {
	const navigate = useNavigate();
	const { deck } = useLoaderData();
	
	// Local state for edit cards (isolated from Redux draft)
	const [editCards, setEditCards] = useState(deck.cards || []);

	const handleBack = () => {
		navigate("/");
	};

	const handleCardAdd = (cardData) => {
		const newCard = {
			...cardData,
			id: Date.now().toString(),
		};
		setEditCards(prev => [...prev, newCard]);
	};

	const handleCardRemove = (cardId) => {
		setEditCards(prev => prev.filter(card => card.id !== cardId));
	};

	return (
		<>
			<BackButton onClick={handleBack}>
				<FaArrowLeft className="w-4 h-4" />
				Back to Decks
			</BackButton>

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
				/>
			</ContentLayout>
		</>
	);
}

export default EditDeckPage;
