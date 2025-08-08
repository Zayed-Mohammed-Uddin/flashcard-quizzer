import { getDeckById } from "../../../services/deckApi";

export const editDeckLoader = async ({ params }) => {
	try {
		const deck = await getDeckById(params.deckId);
		return { deck };
	} catch (err) {
		throw new Error(err.message);
	}
};
