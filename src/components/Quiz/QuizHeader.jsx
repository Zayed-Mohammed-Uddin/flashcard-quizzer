import { HiRefresh } from "react-icons/hi";
import { ContentHeader, Heading, SubText, Button } from "../../ui";
import { pluralize } from "../../utils";

function QuizHeader({ deck, currentCardIndex, totalCards, onRestart, onExit }) {
	return (
		<ContentHeader>
			<div>
				<Heading as="h1">Quiz: {deck.title || deck.name}</Heading>
				<SubText>
					{pluralize(currentCardIndex + 1, "Card")}{" "}
					{currentCardIndex + 1} of {totalCards}
				</SubText>
			</div>
			<div className="flex gap-2">
				<Button variant="secondary" onClick={onRestart}>
					<HiRefresh className="w-4 h-4" />
					Restart
				</Button>
				<Button variant="secondary" onClick={onExit}>
					Exit Quiz
				</Button>
			</div>
		</ContentHeader>
	);
}

export default QuizHeader;
