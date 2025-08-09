import { FaEdit, FaCalendarAlt, FaPlay } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { getCardStats } from "../../utils/spacedRepetition";
import { deleteDeck } from "../Deck/slice/decksSlice";
import { deleteDeck as deleteDeckApi } from "../../services/deckApi";
import { ROUTES, pluralize } from "../../utils";
import {
	Card,
	CardHeader,
	CardTitle,
	CardActions,
	Button,
	IconButton,
	Description,
	MetaInfo,
	DateInfo,
	CardStats,
	StatBadge,
} from "../../ui";
import DeleteDeckDialog from "./DeleteDeckDialog";
import QuizStartDialog from "./QuizStartDialog";

function DeckCardItem({ deck }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const totalCards = deck.cards.length;

	const cardStats = useMemo(() => getCardStats(deck.cards), [deck.cards]);
	const dueCards = cardStats.due;

	const timeStrings = useMemo(() => {
		const createdTimeAgo = formatDistanceToNow(new Date(deck.createdAt), {
			addSuffix: true,
		});
		const updatedTimeAgo = deck.updatedAt
			? formatDistanceToNow(new Date(deck.updatedAt), { addSuffix: true })
			: null;
		return { createdTimeAgo, updatedTimeAgo };
	}, [deck.createdAt, deck.updatedAt]);

	const { createdTimeAgo, updatedTimeAgo } = timeStrings;

	const getScoreBadgeType = (score) => {
		if (score >= 80) return "score-high";
		if (score > 50) return "score-medium";
		return "score-low";
	};

	const handleEditDeck = () => {
		navigate(`${ROUTES.EDIT_DECK}/${deck.id}`);
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
		setIsDeleting(false);
	};

	const handleStartQuiz = () => {
		if (dueCards === 0) {
			setIsQuizDialogOpen(true);
		} else {
			navigate(`${ROUTES.QUIZ_DECK}/${deck.id}`);
		}
	};

	const handleForceStartQuiz = () => {
		setIsQuizDialogOpen(false);
		navigate(`${ROUTES.QUIZ_DECK}/${deck.id}?forceAll=true`);
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
						<DeleteDeckDialog
							deck={deck}
							onDelete={handleDeleteClick}
							isDeleting={isDeleting}
						/>
					</CardActions>
				</CardHeader>

				<Description>{deck.description}</Description>

				<MetaInfo>
					<DateInfo>
						<FaCalendarAlt className="w-3 h-3 mr-1" />
						{createdTimeAgo}
						{deck.updatedAt && (
							<span className="ms-3 text-sm">
								<GrUpdate className="inline-block w-3 h-3 mr-2" />
								{updatedTimeAgo}
							</span>
						)}
					</DateInfo>
				</MetaInfo>

				<CardStats>
					<StatBadge type="total">{totalCards} cards</StatBadge>
					<StatBadge type="due">{dueCards} due for review</StatBadge>
					{deck.lastQuizResult && (
						<StatBadge
							type={getScoreBadgeType(deck.lastQuizResult.score)}
						>
							Last score: {deck.lastQuizResult.score}%
						</StatBadge>
					)}
				</CardStats>

				<Button
					variant="primary"
					size="default"
					className="w-full"
					onClick={handleStartQuiz}
				>
					<FaPlay className="w-3 h-3" />
					{dueCards > 0
						? `Review ${dueCards} ${pluralize(dueCards, "Card")}`
						: "Start Quiz"}
				</Button>
			</Card>

			<QuizStartDialog
				deck={deck}
				isOpen={isQuizDialogOpen}
				onOpenChange={setIsQuizDialogOpen}
				onForceStart={handleForceStartQuiz}
			/>
		</>
	);
}

export default DeckCardItem;
