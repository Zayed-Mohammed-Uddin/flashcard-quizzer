import { getDeckById } from "../../../services/deckApi";
import { getDueCards } from "../../../utils/spacedRepetition";

export const quizDeckLoader = async ({ params, request }) => {
	try {
		const deck = await getDeckById(params.deckId);
		const url = new URL(request.url);
		const forceAll = url.searchParams.get("forceAll") === "true";

		let dueCards;
		if (forceAll) {
			dueCards = deck.cards;
		} else {
			dueCards = getDueCards(deck.cards);
		}

		return { deck, dueCards };
	} catch (err) {
		throw new Error(err.message);
	}
};
