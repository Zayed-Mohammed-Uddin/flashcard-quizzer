import { useNavigate } from "react-router-dom";
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

function CreateDeckPage() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/");
	};

	return (
		<>
			<Button variant="back" onClick={handleBack}>
				<FaArrowLeft className="w-4 h-4" />
				Back to Decks
			</Button>

			<ContentHeader type="vertical">
				<Heading as="h1">Create New Deck</Heading>
				<SubText>
					Create a new flashcard deck to start learning.
				</SubText>
			</ContentHeader>

			<ContentLayout>
				<DeckDetailsForm />
				<FlashcardsList />
			</ContentLayout>
		</>
	);
}

export default CreateDeckPage;
