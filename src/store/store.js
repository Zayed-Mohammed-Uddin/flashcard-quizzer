import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "../components/Deck/slice/decksSlice";

const store = configureStore({
	reducer: {
		decks: decksReducer,
	},
});

export default store;
