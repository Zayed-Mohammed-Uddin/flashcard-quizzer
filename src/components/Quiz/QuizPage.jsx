import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import QuestionCard from "./QuestionCard";
import QuizCompletionScreen from "./QuizCompletionScreen";
import QuizEmptyState from "./QuizEmptyState";
import QuizHeader from "./QuizHeader";
import { updateDeckWithQuizResults } from "../Deck/slice/decksSlice";
import { calculateNextReview } from "../../utils/spacedRepetition";
import { Progress, QuizContainer } from "../../ui";

function QuizPage() {
	const { deck, dueCards } = useLoaderData();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isRevealed, setIsRevealed] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [updatedCards, setUpdatedCards] = useState([]);

	const totalCards = dueCards.length;
	const currentCard = dueCards[currentCardIndex];

	const handleRestart = () => {
		setCurrentCardIndex(0);
		setIsRevealed(false);
		setCorrectAnswers(0);
		setQuizCompleted(false);
		setUpdatedCards([]);
	};

	const handleExitQuiz = () => {
		navigate("/");
	};

	const handleReveal = () => {
		setIsRevealed(true);
	};

	const handleAnswer = (isCorrect) => {
		if (isCorrect) {
			setCorrectAnswers((prev) => prev + 1);
		}

		const updatedCard = calculateNextReview(currentCard, isCorrect);
		setUpdatedCards((prev) => [...prev, updatedCard]);

		if (currentCardIndex + 1 >= totalCards) {
			setQuizCompleted(true);

			const finalCorrectAnswers = isCorrect
				? correctAnswers + 1
				: correctAnswers;

			dispatch(
				updateDeckWithQuizResults({
					deck,
					correctAnswers: finalCorrectAnswers,
					totalCards,
					updatedCards: [...updatedCards, updatedCard],
				})
			);
		} else {
			setCurrentCardIndex((prev) => prev + 1);
			setIsRevealed(false);
		}
	};

	const percentage =
		totalCards > 0 ? Math.round((correctAnswers / totalCards) * 100) : 0;
	const incorrectAnswers = totalCards - correctAnswers;

	if (quizCompleted) {
		return (
			<QuizCompletionScreen
				deck={deck}
				percentage={percentage}
				correctAnswers={correctAnswers}
				incorrectAnswers={incorrectAnswers}
				totalCards={totalCards}
				onRestart={handleRestart}
				onExit={handleExitQuiz}
			/>
		);
	}

	if (!currentCard) {
		return <QuizEmptyState onExit={handleExitQuiz} />;
	}

	return (
		<QuizContainer>
			<QuizHeader
				deck={deck}
				currentCardIndex={currentCardIndex}
				totalCards={totalCards}
				onRestart={handleRestart}
				onExit={handleExitQuiz}
			/>

			<Progress
				current={currentCardIndex + 1}
				total={totalCards}
				correct={correctAnswers}
			/>

			<QuestionCard
				card={currentCard}
				isRevealed={isRevealed}
				onReveal={handleReveal}
				onAnswer={handleAnswer}
				level={currentCard.level || 1}
			/>
		</QuizContainer>
	);
}

export default QuizPage;
