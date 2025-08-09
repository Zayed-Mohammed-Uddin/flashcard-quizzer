import { HiArrowLeft } from "react-icons/hi";
import {
	ContentHeader,
	Heading,
	SubText,
	Button,
	QuizContainer,
} from "../../ui";

function QuizEmptyState({ onExit }) {
	return (
		<QuizContainer>
			<ContentHeader type="horizontal">
				<div className="flex flex-col gap-2">
					<Heading as="h1">No Cards Available</Heading>
					<SubText>
						All cards in this deck have been reviewed recently
					</SubText>
				</div>
				<div className="flex gap-2">
					<Button variant="primary" onClick={onExit}>
						<HiArrowLeft className="w-4 h-4" />
						Back to Decks
					</Button>
				</div>
			</ContentHeader>
		</QuizContainer>
	);
}

export default QuizEmptyState;
