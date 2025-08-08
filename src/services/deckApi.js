import { API_BASE_URL } from "../utils/helper";

// Generic API request function
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

// 1. Fetch all decks from db.json
export async function getDecks() {
	return await apiRequest("/decks");
}

// 1b. Fetch a single deck by ID
export async function getDeckById(deckId) {
	return await apiRequest(`/decks/${deckId}`);
}

// 3. Create a new deck in db.json
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

// 6. Delete a deck from db.json
export async function deleteDeck(deckId) {
	return await apiRequest(`/decks/${deckId}`, {
		method: "DELETE",
	});
}

// Update an existing deck in db.json
export async function updateDeck(deckId, deckData) {
	// First, get the existing deck to preserve certain fields
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
