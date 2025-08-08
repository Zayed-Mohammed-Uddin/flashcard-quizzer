import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllDecks, loadDecks } from "../Deck/slice/decksSlice";
import { getDecks } from "../../services/deckApi";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import ContentHeader from "../../ui/ContentHeader";
import SubText from "../../ui/SubText";
import DecksGrid from "../../ui/DecksGrid";
import DeckCardItem from "./DeckCardItem";

function DashboardPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const decks = useSelector(selectAllDecks);
	const deckCount = decks.length;

	// Load decks from API on component mount
	useEffect(() => {
		const loadDecksData = async () => {
			try {
				const apiDecks = await getDecks();

				// Defensive check: ensure we got an array
				if (Array.isArray(apiDecks)) {
					dispatch(loadDecks(apiDecks));
				} else {
					console.error("Invalid decks data received:", apiDecks);
				}
			} catch (error) {
				console.error("Failed to load decks:", error);
			}
		};

		// Only load if we don't have decks in Redux already
		if (decks.length === 0) {
			loadDecksData();
		}
	}, [dispatch, decks.length]);

	const handleCreateDeck = () => {
		navigate("/create-deck");
	};

	return (
		<>
			<ContentHeader type="horizontal">
				<div className="flex flex-col gap-2">
					<Heading as="h1">My Flashcard Decks</Heading>
					<SubText>
						{deckCount === 0
							? "No decks yet. Create your first deck to get started!"
							: `You have ${deckCount} deck${
									deckCount === 1 ? "" : "s"
							  }`}
					</SubText>
				</div>
				<div className="flex gap-2">
					<Button variant="primary" onClick={handleCreateDeck}>
						<FaPlus className="w-4 h-4" />
						Create Deck
					</Button>
				</div>
			</ContentHeader>

			<DecksGrid>
				{decks.map((deck) => (
					<DeckCardItem key={deck.id} deck={deck} />
				))}
			</DecksGrid>
		</>
	);
}

export default DashboardPage;
