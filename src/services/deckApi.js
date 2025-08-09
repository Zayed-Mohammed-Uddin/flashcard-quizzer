import { API_BASE_URL } from "../utils";

async function apiRequest(endpoint, options = {}) {
	const url = `${API_BASE_URL}${endpoint}`;

	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("API request failed:", error);
		throw error;
	}
}

export async function getDecks() {
	return await apiRequest("/decks");
}

export async function getDeckById(deckId) {
	return await apiRequest(`/decks/${deckId}`);
}

export async function createDeck(deckData) {
	const newDeck = {
		id: Date.now().toString(),
		name: deckData.name,
		description: deckData.description,
		cards: deckData.cards || [],
		createdAt: new Date().toISOString(),
	};

	return await apiRequest("/decks", {
		method: "POST",
		body: JSON.stringify(newDeck),
	});
}

export async function deleteDeck(deckId) {
	return await apiRequest(`/decks/${deckId}`, {
		method: "DELETE",
	});
}

export async function updateDeck(deckId, deckData) {
	const existingDeck = await getDeckById(deckId);
	const updatedDeck = {
		...deckData,
		id: deckId,
		createdAt: existingDeck.createdAt,
		updatedAt: new Date().toISOString(),
	};

	return await apiRequest(`/decks/${deckId}`, {
		method: "PUT",
		body: JSON.stringify(updatedDeck),
	});
}
