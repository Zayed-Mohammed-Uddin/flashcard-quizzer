import { HiArrowLeft, HiRefresh } from "react-icons/hi";
import {
	ContentHeader,
	Heading,
	SubText,
	Button,
	QuizContainer,
} from "../../ui";
import {
	CompletionCard,
	CompletionScore,
	CompletionMessage,
	ScoreBreakdown,
	ScoreStat,
	StatNumber,
	StatLabel,
} from "../../ui/CompletionComponents";

function QuizCompletionScreen({
	deck,
	percentage,
	correctAnswers,
	incorrectAnswers,
	totalCards,
	onRestart,
	onExit,
}) {
	return (
		<QuizContainer>
			<ContentHeader type="horizontal">
				<div className="flex flex-col gap-2">
					<Heading as="h1">Quiz Complete! 🎉</Heading>
					<SubText>
						Great job completing "{deck.title || deck.name}"
					</SubText>
				</div>
				<div className="flex gap-2">
					<Button variant="secondary" onClick={onRestart}>
						<HiRefresh className="w-4 h-4" />
						Restart
					</Button>
					<Button variant="primary" onClick={onExit}>
						<HiArrowLeft className="w-4 h-4" />
						Back to Decks
					</Button>
				</div>
			</ContentHeader>

			<CompletionCard>
				<CompletionScore>{percentage}%</CompletionScore>
				<CompletionMessage>
					{percentage >= 80
						? "Excellent work! You're mastering this deck!"
						: percentage >= 60
						? "Good job! Keep practicing to improve."
						: "Nice try! Review and try again to improve your score."}
				</CompletionMessage>

				<ScoreBreakdown>
					<ScoreStat>
						<StatNumber>{correctAnswers}</StatNumber>
						<StatLabel>Correct</StatLabel>
					</ScoreStat>
					<ScoreStat>
						<StatNumber>{incorrectAnswers}</StatNumber>
						<StatLabel>Incorrect</StatLabel>
					</ScoreStat>
					<ScoreStat>
						<StatNumber>{totalCards}</StatNumber>
						<StatLabel>Total</StatLabel>
					</ScoreStat>
				</ScoreBreakdown>
			</CompletionCard>
		</QuizContainer>
	);
}

export default QuizCompletionScreen;
