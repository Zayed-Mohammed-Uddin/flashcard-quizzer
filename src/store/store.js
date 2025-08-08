import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./decksSlice";

const store = configureStore({
	reducer: {
		decks: decksReducer,
	},
});

export default store;
