import { createSlice } from "@reduxjs/toolkit";

const inistalState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: inistalState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, username, auth } = action.payload;
    },
    resetUser: (state, action) => {},
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
