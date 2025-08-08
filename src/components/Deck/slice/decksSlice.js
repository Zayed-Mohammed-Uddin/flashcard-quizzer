import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// All created decks
	decks: [],
	// Draft cards being created (only cards need persistence)
	draftCards: [],
};

const decksSlice = createSlice({
	name: "decks",
	initialState,
	reducers: {
		// Draft cards management (for creation workflow)
		addCardToDraft: (state, action) => {
			state.draftCards.push({
				...action.payload,
				id: Date.now().toString(),
			});
		},
		removeCardFromDraft: (state, action) => {
			state.draftCards = state.draftCards.filter(
				(card) => card.id !== action.payload
			);
		},
		resetDraftCards: (state) => {
			state.draftCards = [];
		},

		// Deck management
		addDeck: (state, action) => {
			const deck = {
				id: action.payload.id || Date.now().toString(),
				name: action.payload.name,
				description: action.payload.description,
				cards: action.payload.cards || [],
				createdAt: action.payload.createdAt || new Date().toISOString(),
			};
			state.decks.push(deck);
		},
		deleteDeck: (state, action) => {
			state.decks = state.decks.filter(
				(deck) => deck.id !== action.payload
			);
		},
		updateDeck: (state, action) => {
			const index = state.decks.findIndex(
				(deck) => deck.id === action.payload.id
			);
			if (index !== -1) {
				state.decks[index] = action.payload;
			}
		},
		loadDecks: (state, action) => {
			state.decks = action.payload;
		},
	},
});

export const {
	// Draft cards actions
	addCardToDraft,
	removeCardFromDraft,
	resetDraftCards,

	// Deck management actions
	addDeck,
	deleteDeck,
	updateDeck,
	loadDecks,
} = decksSlice.actions;

// Selectors
export const selectAllDecks = (state) => state.decks.decks;

export const selectDeckById = (state, deckId) =>
	state.decks.decks.find((deck) => deck.id === deckId);

export const selectDraftCards = (state) => state.decks.draftCards;

export default decksSlice.reducer;
