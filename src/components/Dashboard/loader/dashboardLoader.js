import { getDecks } from "../../../services/deckApi";

export const dashboardLoader = async () => {
	try {
		const decks = await getDecks();
		return { decks };
	} catch (err) {
		throw new Error(
			err.message
		);
	}
};
