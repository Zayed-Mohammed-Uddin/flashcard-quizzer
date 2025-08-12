import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Heading, SubText, ContentHeader } from "../ui";
import CreateUser from "./User/CreateUser";
import { selectUsername } from "./User/slice/userSlice";

function LandingPage() {
	const username = useSelector(selectUsername);

	if (username) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="max-w-md mx-auto">
			<ContentHeader type="vertical" className="text-center">
				<Heading as="h1">Welcome to Flashcard Quizzer</Heading>
				<SubText className="text-center">
					Master your learning with spaced repetition flashcards.
					Create decks, study efficiently, and track your progress.
				</SubText>
			</ContentHeader>

			<CreateUser />
		</div>
	);
}

export default LandingPage;
