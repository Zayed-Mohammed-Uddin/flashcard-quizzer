import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: localStorage.getItem("username") || null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
			localStorage.setItem("username", action.payload);
		},
		clearUsername: (state) => {
			state.username = null;
			localStorage.removeItem("username");
		},
	},
});

export const { setUsername, clearUsername } = userSlice.actions;

export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;
