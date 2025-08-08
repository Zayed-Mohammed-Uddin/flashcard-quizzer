import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// All created decks
	decks: [],
	// Draft deck being created
	draftDeck: {
		title: "",
		description: "",
		cards: [],
	},
};

const decksSlice = createSlice({
	name: "decks",
	initialState,
	reducers: {
		// Draft deck management (for creation workflow)
		addCardToDraft: (state, action) => {
			state.draftDeck.cards.push({
				...action.payload,
				id: Date.now().toString(),
			});
		},
		removeCardFromDraft: (state, action) => {
			state.draftDeck.cards = state.draftDeck.cards.filter(
				(card) => card.id !== action.payload
			);
		},
		resetDraftDeck: (state) => {
			state.draftDeck = {
				title: "",
				description: "",
				cards: [],
			};
		},
		restoreDraftDeck: (state, action) => {
			state.draftDeck = action.payload;
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
		loadDecks: (state, action) => {
			state.decks = action.payload;
		},
	},
});

export const {
	// Draft deck actions
	addCardToDraft,
	removeCardFromDraft,
	resetDraftDeck,
	restoreDraftDeck,

	// Deck management actions
	addDeck,
	deleteDeck,
	loadDecks,
} = decksSlice.actions;

// Selectors
export const selectAllDecks = (state) => state.decks.decks;

export const selectDeckById = (state, deckId) =>
	state.decks.decks.find((deck) => deck.id === deckId);

export const selectDraftDeck = (state) => state.decks.draftDeck;

export const selectDraftCards = (state) => state.decks.draftDeck.cards;

export default decksSlice.reducer;
