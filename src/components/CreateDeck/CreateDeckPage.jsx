import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DeckDetailsForm from "./DeckDetailsForm";
import FlashcardsList from "./FlashcardsList";
import BackButton from "../../ui/BackButton";
import ContentLayout from "../../ui/ContentLayout";
import ContentHeader from "../../ui/ContentHeader";
import Heading from "../../ui/Heading";
import SubText from "../../ui/SubText";

function CreateDeckPage() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/");
	};

	return (
		<>
			<BackButton onClick={handleBack}>
				<FaArrowLeft className="w-4 h-4" />
				Back to Decks
			</BackButton>

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
