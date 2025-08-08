import { getDeckById } from "../../../services/deckApi";

export const quizDeckLoader = async ({ params }) => {
	try {
		const deck = await getDeckById(params.deckId);
		// Filter cards that are due for review
		const dueCards = deck.cards.filter(
			(card) => card.nextReview <= Date.now()
		);
		return { deck, dueCards };
	} catch (err) {
		throw new Error(err.message);
	}
};
