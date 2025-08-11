import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "../components/Deck/slice/decksSlice";
import userReducer from "../components/User/slice/userSlice";

const store = configureStore({
	reducer: {
		decks: decksReducer,
		user: userReducer,
	},
});

export default store;
