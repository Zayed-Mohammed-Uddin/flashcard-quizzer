import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../../utils";

const initialState = {
	decks: [],
	draftCards: [],
};

const decksSlice = createSlice({
	name: "decks",
	initialState,
	reducers: {
		addCardToDraft: (state, action) => {
			state.draftCards.push({
				...action.payload,
				id: generateId(),
			});
		},
		removeCardFromDraft: (state, action) => {
			state.draftCards = state.draftCards.filter(
				(card) => card.id !== action.payload
			);
		},
		editCardInDraft: (state, action) => {
			const { id, cardData } = action.payload;
			const index = state.draftCards.findIndex((card) => card.id === id);
			if (index !== -1) {
				state.draftCards[index] = {
					...state.draftCards[index],
					...cardData,
				};
			}
		},
		resetDraftCards: (state) => {
			state.draftCards = [];
		},

		addDeck: (state, action) => {
			state.decks.push({
				id: action.payload.id || generateId(),
				name: action.payload.name,
				description: action.payload.description,
				cards: action.payload.cards || [],
				createdAt: action.payload.createdAt || new Date().toISOString(),
			});
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
		updateDeckWithQuizResults: (state, action) => {
			const { deck, correctAnswers, totalCards, updatedCards } =
				action.payload;
			const percentage = Math.round((correctAnswers / totalCards) * 100);
			const timestamp = new Date().toISOString();

			const updatedDeckCards = deck.cards.map((card) => {
				const updatedCard = updatedCards.find(
					(updated) => updated.id === card.id
				);
				return updatedCard || card;
			});

			const index = state.decks.findIndex((d) => d.id === deck.id);
			if (index !== -1) {
				state.decks[index] = {
					...deck,
					cards: updatedDeckCards,
					lastQuizResult: {
						score: percentage,
						correctAnswers,
						totalCards,
						completedAt: timestamp,
					},
					updatedAt: timestamp,
				};
			}
		},
	},
});

export const {
	addCardToDraft,
	removeCardFromDraft,
	editCardInDraft,
	resetDraftCards,

	addDeck,
	deleteDeck,
	updateDeck,
	loadDecks,
	updateDeckWithQuizResults,
} = decksSlice.actions;

export const selectAllDecks = (state) => state.decks.decks;

export const selectDeckById = (state, deckId) =>
	state.decks.decks.find((deck) => deck.id === deckId);

export const selectDraftCards = (state) => state.decks.draftCards;

export default decksSlice.reducer;
