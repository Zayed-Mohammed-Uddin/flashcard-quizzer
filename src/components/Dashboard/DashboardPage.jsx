import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { selectAllDecks, loadDecks } from "../Deck/slice/decksSlice";
import { getDecks } from "../../services/deckApi";
import { MESSAGES, ROUTES, pluralize } from "../../utils";
import { Heading, Button, ContentHeader, SubText, DecksGrid } from "../../ui";
import DeckCardItem from "./DeckCardItem";
import tw from "tailwind-styled-components";

const LeftBlock = tw.div`
  flex flex-col
`;

const RightBlock = tw.div`
  w-full sm:w-auto
`;

function DashboardPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const decks = useSelector(selectAllDecks);
	const deckCount = decks.length;
	const hasLoadedRef = useRef(false);

	useEffect(() => {
		if (hasLoadedRef.current || decks.length > 0) {
			return;
		}

		const loadDecksData = async () => {
			try {
				hasLoadedRef.current = true;
				const apiDecks = await getDecks();

				if (Array.isArray(apiDecks)) {
					dispatch(loadDecks(apiDecks));
				} else {
					console.error("Invalid decks data received:", apiDecks);
				}
			} catch (error) {
				console.error("Failed to load decks:", error);
				hasLoadedRef.current = false;
			}
		};

		loadDecksData();
	}, [dispatch, decks.length]);

	const handleCreateDeck = () => {
		navigate(ROUTES.CREATE_DECK);
	};

	return (
		<>
			<ContentHeader>
				<LeftBlock>
					<Heading as="h1">My Flashcard Decks</Heading>
					<SubText>
						{deckCount === 0
							? MESSAGES.NO_DECKS
							: `You have ${deckCount} ${pluralize(
									deckCount,
									"deck"
							  )}`}
					</SubText>
				</LeftBlock>
				<RightBlock>
					<Button
						variant="primary"
						onClick={handleCreateDeck}
						className="w-full sm:w-auto" // full width mobile, auto width desktop
					>
						<FaPlus className="w-4 h-4" />
						Create Deck
					</Button>
				</RightBlock>
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
