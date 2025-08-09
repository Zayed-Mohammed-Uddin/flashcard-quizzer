import { FaEye } from "react-icons/fa";
import {
	QuestionContainer,
	QuestionHeader,
	QuestionTitle,
	LevelBadge,
	CardDisplay,
	CardContent,
	ActionButtonsContainer,
	RevealButton,
	AnswerButton,
} from "../../ui/QuestionComponents";

function QuestionCard({ card, isRevealed, onReveal, onAnswer, level = 1 }) {
	return (
		<QuestionContainer>
			<QuestionHeader>
				<QuestionTitle>Question</QuestionTitle>
				<LevelBadge>Level {level}</LevelBadge>
			</QuestionHeader>

			<CardDisplay>
				<CardContent>{isRevealed ? card.back : card.front}</CardContent>
			</CardDisplay>

			{!isRevealed ? (
				<RevealButton onClick={onReveal}>
					<FaEye className="w-5 h-5" />
					Reveal Answer
				</RevealButton>
			) : (
				<ActionButtonsContainer>
					<AnswerButton
						variant="incorrect"
						onClick={() => onAnswer(false)}
					>
						Incorrect
					</AnswerButton>
					<AnswerButton
						variant="correct"
						onClick={() => onAnswer(true)}
					>
						Correct
					</AnswerButton>
				</ActionButtonsContainer>
			)}
		</QuestionContainer>
	);
}

export default QuestionCard;
